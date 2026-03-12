import { supabase } from './supabase';
import { RankingEntry } from './mockDb';
import { ModuleId, TestResult } from '../types';
import { buildUserAccount } from './authService';

export const userService = {
    updateProfile: async (email: string, updates: { name?: string; city?: string; age?: number; photoUrl?: string }) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Não autenticado");

        const { data, error } = await supabase
            .from('profiles')
            .update({
                name: updates.name,
                city: updates.city,
                age: updates.age,
                photo_url: updates.photoUrl
            })
            .eq('id', user.id)
            .select()
            .single();

        if (error) throw new Error(error.message);

        return {
            id: data.id,
            email: data.email,
            name: data.name,
            city: data.city,
            age: data.age,
            photoUrl: data.photo_url,
            createdAt: new Date(data.created_at).getTime()
        };
    },

    saveTestResult: async (email: string, moduleId: ModuleId, result: TestResult) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) throw new Error("Não autenticado");

        const percentage = (result.score / result.total) * 100;

        // 1. Inserir Test Result
        const { error: resultErr } = await supabase.from('test_results').insert({
            user_id: user.id,
            module_id: moduleId,
            correct_answers: result.score,
            total_questions: result.total,
            percentage: percentage,
            time_spent_seconds: result.durationSeconds
        });

        if (resultErr) console.error("Erro ao salvar resultado de teste:", resultErr);

        // 2. Atualizar Module Progress (Upsert)
        const isCompleted = percentage >= 70;

        // Let's get current progress for this module to check best_score
        const { data: existingProgress } = await supabase
            .from('module_progress')
            .select('id, best_score, is_completed')
            .eq('user_id', user.id)
            .eq('module_id', moduleId)
            .maybeSingle();

        if (existingProgress) {
            await supabase.from('module_progress').update({
                best_score: Math.max(existingProgress.best_score || 0, result.score),
                is_completed: existingProgress.is_completed || isCompleted,
                updated_at: new Date().toISOString()
            }).eq('id', existingProgress.id);
        } else {
            await supabase.from('module_progress').insert({
                user_id: user.id,
                module_id: moduleId,
                best_score: result.score,
                is_completed: isCompleted,
            });
        }

        // Return updated stats by rebuilding user account
        const updatedUser = await buildUserAccount(user.id, user.email!);
        return updatedUser.stats;
    },

    getRanking: async (moduleId: ModuleId): Promise<RankingEntry[]> => {
        // Query test_results ordered by correct_answers DESC, then time_spent_seconds ASC
        const { data, error } = await supabase
            .from('test_results')
            .select(`
                user_id,
                correct_answers,
                total_questions,
                percentage,
                time_spent_seconds,
                profiles ( name, photo_url )
            `)
            .eq('module_id', moduleId)
            .order('correct_answers', { ascending: false })
            .order('time_spent_seconds', { ascending: true })
            .limit(50); // Just top 50 to avoid massive payloads

        if (error || !data) return [];

        // We only want the best entry for each user. Group by user_id
        const userBestScores = new Map<string, any>();

        data.forEach((row: any) => {
            const current = userBestScores.get(row.user_id);
            if (!current) {
                userBestScores.set(row.user_id, row);
            } else {
                if (row.correct_answers > current.correct_answers ||
                    (row.correct_answers === current.correct_answers && row.time_spent_seconds < current.time_spent_seconds)) {
                    userBestScores.set(row.user_id, row);
                }
            }
        });

        // Re-sort the unique list
        const uniqueRankings = Array.from(userBestScores.values()).sort((a, b) => {
            if (b.correct_answers !== a.correct_answers) return b.correct_answers - a.correct_answers;
            return a.time_spent_seconds - b.time_spent_seconds;
        });

        // Map it to RankingEntry interface
        return uniqueRankings.map((r: any) => ({
            userId: r.user_id,
            name: r.profiles?.name || 'Desconhecido',
            photoUrl: r.profiles?.photo_url || undefined,
            correctAnswers: r.correct_answers,
            totalQuestions: r.total_questions,
            timeSpentSeconds: r.time_spent_seconds,
            percentage: r.percentage
        }));
    }
};

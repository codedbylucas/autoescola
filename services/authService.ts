import { supabase } from './supabase';
import { UserAccount, UserStats } from './mockDb';
import { ModuleId } from '../types';

// Helper to assemble the frontend state from Supabase normalized tables
export const buildUserAccount = async (userId: string, email: string): Promise<UserAccount> => {
    // Fetch profile
    const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();

    // Fetch test results
    const { data: results } = await supabase.from('test_results').select('*').eq('user_id', userId);

    // Fetch module progress
    const { data: progress } = await supabase.from('module_progress').select('*').eq('user_id', userId);

    // Reconstruct Stats
    const stats: UserStats = {
        totalQuestionsAnswered: 0,
        totalCorrectAnswers: 0,
        modulesCompleted: [],
        scores: {
            [ModuleId.SINALIZACAO]: [],
            [ModuleId.LEGISLACAO]: [],
            [ModuleId.DIRECAO_DEFENSIVA]: [],
            [ModuleId.PRIMEIROS_SOCORROS]: [],
            [ModuleId.MEIO_AMBIENTE]: [],
            [ModuleId.SIMULADO_FINAL]: []
        },
        errorPatterns: {
            'Conceitual': 0,
            'Distração': 0,
            'Pegadinha': 0,
            'Interpretação': 0
        },
        totalTimeSeconds: 0,
        lastActivity: profile && profile.created_at ? new Date(profile.created_at).getTime() : Date.now()
    };

    if (results) {
        results.forEach(r => {
            stats.totalQuestionsAnswered += r.total_questions;
            stats.totalCorrectAnswers += r.correct_answers;
            stats.totalTimeSeconds += r.time_spent_seconds;
            if (stats.scores[r.module_id as ModuleId]) {
                stats.scores[r.module_id as ModuleId]!.push(Number(r.percentage));
            }
        });
    }

    if (progress) {
        progress.forEach(p => {
            if (p.is_completed) {
                stats.modulesCompleted.push(p.module_id as ModuleId);
            }

            const updatedTime = new Date(p.updated_at).getTime();
            if (updatedTime > stats.lastActivity) {
                stats.lastActivity = updatedTime;
            }

            // Mocking error patterns since it's not strictly mapped in the DB yet, just to fill the chart
            if (p.questions_answered && p.questions_answered.length > 0) {
                stats.errorPatterns['Pegadinha'] = (stats.errorPatterns['Pegadinha'] || 0) + 1;
            }
        });
    }

    return {
        profile: {
            id: userId,
            email: profile?.email || email,
            name: profile?.name || 'Aluno',
            city: profile?.city,
            age: profile?.age,
            photoUrl: profile?.photo_url,
            createdAt: profile && profile.created_at ? new Date(profile.created_at).getTime() : Date.now()
        },
        stats
    };
};

export const authService = {
    login: async (email: string, pass: string): Promise<UserAccount | null> => {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password: pass });
        if (error || !data.user) {
            throw new Error(error?.message || "Erro no login");
        }
        return await buildUserAccount(data.user.id, data.user.email!);
    },

    register: async (name: string, email: string, pass: string): Promise<UserAccount> => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password: pass,
            options: {
                data: {
                    name: name
                }
            }
        });

        if (error || !data.user) {
            throw new Error(error?.message || "Erro no cadastro");
        }

        // Wait a bit to let the handle_new_user trigger create the Profile
        await new Promise(resolve => setTimeout(resolve, 500));
        return await buildUserAccount(data.user.id, data.user.email!);
    },

    logout: async (): Promise<void> => {
        await supabase.auth.signOut();
    },

    getCurrentUser: async (): Promise<UserAccount | null> => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session && session.user) {
            return await buildUserAccount(session.user.id, session.user.email!);
        }
        return null;
    },

    resetPassword: async (email: string): Promise<boolean> => {
        const { error } = await supabase.auth.resetPasswordForEmail(email);
        if (error) {
            throw new Error(error.message);
        }
        return true;
    }
};

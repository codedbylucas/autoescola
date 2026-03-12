import React, { useEffect, useState } from 'react';
import { ModuleId } from '../types';
import { RankingEntry } from '../services/mockDb';
import { userService } from '../services/userService';
import { MODULES_INFO } from '../constants';
import { Trophy, Medal, Clock, Loader2, User } from 'lucide-react';

export const Ranking = () => {
    const [activeModule, setActiveModule] = useState<ModuleId>(ModuleId.SIMULADO_FINAL);
    const [ranking, setRanking] = useState<RankingEntry[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadRanking = async () => {
            setLoading(true);
            const data = await userService.getRanking(activeModule);
            setRanking(data);
            setLoading(false);
        };
        loadRanking();
    }, [activeModule]);

    return (
        <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
                        <Trophy className="text-amber-500" size={32} /> Super Ranking
                    </h1>
                    <p className="text-gray-500">Veja quem são os melhores de cada módulo. Mostre que você domina a matéria!</p>
                </div>

                {/* Module Selector */}
                <select
                    value={activeModule}
                    onChange={(e) => setActiveModule(e.target.value as ModuleId)}
                    className="bg-white border border-gray-200 text-gray-700 py-2 px-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                >
                    {MODULES_INFO.map(m => (
                        <option key={m.id} value={m.id}>{m.name}</option>
                    ))}
                </select>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
                {loading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm z-10">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                    </div>
                ) : null}

                {ranking.length === 0 && !loading ? (
                    <div className="p-12 text-center text-gray-500">
                        <Medal size={48} className="mx-auto text-gray-300 mb-4" />
                        <p className="text-lg font-medium">Nenhum ranking ainda para este módulo.</p>
                        <p className="text-sm">Seja o primeiro a testar e liderar o placar!</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-100 text-xs uppercase tracking-wider text-gray-500 font-bold">
                                    <th className="p-6 w-16 text-center">Pos</th>
                                    <th className="p-6">Aluno</th>
                                    <th className="p-6 text-center">Acertos</th>
                                    <th className="p-6 text-center w-32 hidden md:table-cell">Aproveitamento</th>
                                    <th className="p-6 text-center w-32 hidden sm:table-cell"><Clock size={16} className="inline mr-1" /> Tempo</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ranking.map((entry, index) => {
                                    // Determinate Medal Icon
                                    let medalIcon = null;
                                    if (index === 0) medalIcon = "🥇";
                                    else if (index === 1) medalIcon = "🥈";
                                    else if (index === 2) medalIcon = "🥉";
                                    else medalIcon = <span className="text-gray-400 font-bold">{index + 1}º</span>;

                                    const isTop3 = index < 3;

                                    return (
                                        <tr key={entry.userId} className={`border-b border-gray-50 hover:bg-slate-50 transition-colors ${index === 0 ? 'bg-amber-50/30' : ''}`}>
                                            <td className="p-6 text-center text-2xl">
                                                {medalIcon}
                                            </td>
                                            <td className="p-6">
                                                <div className="flex items-center gap-4">
                                                    <div className={`w-12 h-12 rounded-full overflow-hidden bg-gray-100 border-2 flex items-center justify-center flex-shrink-0 ${index === 0 ? 'border-amber-400' : index === 1 ? 'border-gray-400' : index === 2 ? 'border-orange-400' : 'border-gray-200'}`}>
                                                        {entry.photoUrl ? (
                                                            <img src={entry.photoUrl} alt={entry.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <User className="text-gray-400" size={20} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <p className={`font-bold text-gray-800 ${isTop3 ? 'text-lg' : ''}`}>{entry.name}</p>
                                                        <span className="text-xs text-gray-400 hidden sm:inline-block">ID: #{entry.userId.substring(0, 5)}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-6 text-center">
                                                <p className="text-xl font-bold text-gray-800">{entry.correctAnswers}<span className="text-sm text-gray-400 font-normal">/{entry.totalQuestions}</span></p>
                                            </td>
                                            <td className="p-6 text-center hidden md:table-cell">
                                                <div className={`inline-flex px-3 py-1 rounded-full text-sm font-bold ${entry.percentage >= 70 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    {Math.round(entry.percentage)}%
                                                </div>
                                            </td>
                                            <td className="p-6 text-center text-gray-500 font-medium hidden sm:table-cell">
                                                {Math.floor(entry.timeSpentSeconds / 60)}m {entry.timeSpentSeconds % 60}s
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

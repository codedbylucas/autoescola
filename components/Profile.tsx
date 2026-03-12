import React, { useState } from 'react';
import { UserAccount, UserProfile } from '../services/mockDb';
import { userService } from '../services/userService';
import { User, MapPin, Calendar, Camera, CheckCircle2, Loader2, Award, Target, BrainCircuit, BarChart3, Edit2 } from 'lucide-react';
import { MODULES_INFO } from '../constants';
import { ModuleId } from '../types';

interface ProfileProps {
    user: UserAccount;
    onUpdateUser: (user: UserAccount) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onUpdateUser }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Form state
    const [name, setName] = useState(user.profile.name);
    const [city, setCity] = useState(user.profile.city || '');
    const [age, setAge] = useState(user.profile.age?.toString() || '');
    const [photoUrl, setPhotoUrl] = useState(user.profile.photoUrl || '');

    const totalQuestionsAnswered = user.stats.totalQuestionsAnswered;
    const completedModules = user.stats.modulesCompleted.length;

    const totalScore = user.stats.totalCorrectAnswers;
    const totalMaxScore = user.stats.totalQuestionsAnswered;

    const overallAccuracy = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const updatedProfile = await userService.updateProfile(user.email, {
                name,
                city,
                age: age ? parseInt(age) : undefined,
                photoUrl
            });

            onUpdateUser({ ...user, profile: updatedProfile });
            setIsEditing(false);
        } catch (err: any) {
            setError(err.message || 'Erro ao atualizar perfil');
        } finally {
            setLoading(false);
        }
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            setError("A imagem deve ter no máximo 2MB");
            return;
        }

        const reader = new FileReader();
        reader.onloadend = () => {
            setPhotoUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Left Column - Profile Card */}
                <div className="w-full md:w-1/3 space-y-6">
                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-500 to-indigo-600 opacity-90"></div>

                        <div className="relative pt-12 flex flex-col items-center">
                            <div className="relative group cursor-pointer mb-4">
                                <div className="w-28 h-28 rounded-full border-4 border-white shadow-lg overflow-hidden bg-white flex items-center justify-center">
                                    {photoUrl ? (
                                        <img src={photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                                    ) : (
                                        <User size={48} className="text-gray-300" />
                                    )}
                                </div>

                                {isEditing && (
                                    <label className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                                        <Camera className="text-white" size={24} />
                                        <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                                    </label>
                                )}
                            </div>

                            <h2 className="text-2xl font-bold text-gray-800">{user.profile.name}</h2>
                            <p className="text-gray-500 font-medium mb-6">{user.email}</p>

                            {!isEditing ? (
                                <div className="w-full space-y-3">
                                    <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
                                        <MapPin className="text-blue-500" size={20} />
                                        <span>{user.profile.city || 'Cidade não informada'}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-600 bg-gray-50 p-3 rounded-xl">
                                        <Calendar className="text-blue-500" size={20} />
                                        <span>{user.profile.age ? `${user.profile.age} anos` : 'Idade não informada'}</span>
                                    </div>

                                    <button
                                        onClick={() => setIsEditing(true)}
                                        className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-colors"
                                    >
                                        <Edit2 size={18} /> Editar Perfil
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSave} className="w-full space-y-4">
                                    {error && <div className="text-red-500 text-sm">{error}</div>}

                                    <div>
                                        <label className="text-xs text-gray-500 ml-1">Nome</label>
                                        <input
                                            type="text"
                                            value={name}
                                            onChange={e => setName(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 ml-1">Cidade</label>
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={e => setCity(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs text-gray-500 ml-1">Idade</label>
                                        <input
                                            type="number"
                                            value={age}
                                            onChange={e => setAge(e.target.value)}
                                            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>

                                    <div className="flex gap-2 pt-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(false)}
                                            className="flex-1 py-2 text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 py-2 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 flex justify-center items-center"
                                        >
                                            {loading ? <Loader2 size={20} className="animate-spin" /> : 'Salvar'}
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats */}
                <div className="w-full md:w-2/3 space-y-6">
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mb-2">
                                <Target size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800">{totalQuestionsAnswered}</h3>
                            <p className="text-xs text-gray-500 font-medium">Questões Resolvidas</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 mb-2">
                                <Award size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800">{overallAccuracy}%</h3>
                            <p className="text-xs text-gray-500 font-medium">Precisão Global</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mb-2">
                                <BrainCircuit size={24} />
                            </div>
                            <h3 className="text-2xl font-black text-gray-800">{completedModules}</h3>
                            <p className="text-xs text-gray-500 font-medium">Módulos Concluídos</p>
                        </div>

                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 mb-2">
                                <BarChart3 size={24} />
                            </div>
                            <h3 className="text-xl font-black text-gray-800">12º</h3>
                            <p className="text-xs text-gray-500 font-medium">Posição Geral</p>
                        </div>
                    </div>

                    <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
                        <h3 className="text-xl font-bold flex items-center gap-2 mb-6 text-gray-800">
                            <Award className="text-blue-500" /> Desempenho por Módulo
                        </h3>

                        <div className="space-y-4">
                            {MODULES_INFO.map(mod => {
                                const scores = user.stats.scores[mod.id as ModuleId] || [];
                                const accuracy = scores.length > 0 ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
                                const isStarted = scores.length > 0;
                                const isCompleted = user.stats.modulesCompleted.includes(mod.id as ModuleId);

                                return (
                                    <div key={mod.id} className="relative">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-sm font-bold text-gray-700 flex items-center gap-2">
                                                {isCompleted && <CheckCircle2 size={16} className="text-green-500" />}
                                                {mod.name}
                                            </span>
                                            <span className="text-sm font-bold text-gray-500">{accuracy}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
                                            <div
                                                className={`h-3 rounded-full transition-all duration-1000 ${accuracy >= 70 ? 'bg-green-500' :
                                                    accuracy >= 50 ? 'bg-amber-400' :
                                                        accuracy > 0 ? 'bg-orange-500' : 'bg-gray-200'
                                                    }`}
                                                style={{ width: `${isStarted ? Math.max(accuracy, 5) : 0}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

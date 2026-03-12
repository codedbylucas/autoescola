import React, { useState } from 'react';
import { UserAccount, UserProfile } from '../services/mockDb';
import { userService } from '../services/userService';
import { User, MapPin, Calendar, Camera, CheckCircle2, Loader2, Award, Target, BrainCircuit, PlayCircle } from 'lucide-react';

interface ProfileProps {
    user: UserAccount;
    onProfileUpdate: (updatedProfile: UserProfile) => void;
}

export const Profile: React.FC<ProfileProps> = ({ user, onProfileUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    // Edit state
    const [name, setName] = useState(user.profile.name);
    const [city, setCity] = useState(user.profile.city || '');
    const [age, setAge] = useState<number | string>(user.profile.age || '');
    const [photoUrl, setPhotoUrl] = useState(user.profile.photoUrl || '');

    const stats = user.stats;

    const handleSave = async () => {
        setLoading(true);
        try {
            const updated = await userService.updateProfile(user.profile.email, {
                name,
                city,
                age: age ? Number(age) : undefined,
                photoUrl
            });
            onProfileUpdate(updated);
            setIsEditing(false);
            setSuccessMsg("Perfil atualizado com sucesso!");
            setTimeout(() => setSuccessMsg(''), 3000);
        } catch (e) {
            console.error(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6 animate-fadeIn max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-800">Meu Perfil</h1>
                    <p className="text-gray-500">Gerencie suas informações e acompanhe seu histórico.</p>
                </div>
                {successMsg && (
                    <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
                        <CheckCircle2 size={16} /> {successMsg}
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="lg:col-span-1 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                    <div className="flex flex-col items-center">
                        <div className="relative mb-4 group">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-50 bg-gray-100 flex items-center justify-center">
                                {photoUrl ? (
                                    <img src={photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                                ) : (
                                    <User size={48} className="text-gray-400" />
                                )}
                            </div>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 p-2 bg-blue-600 rounded-full text-white hover:bg-blue-700 transition">
                                    <Camera size={16} />
                                </button>
                            )}
                        </div>

                        {!isEditing ? (
                            <div className="text-center w-full">
                                <h2 className="text-2xl font-bold text-gray-800">{user.profile.name}</h2>
                                <div className="flex flex-col gap-2 mt-4 text-gray-600 w-full">
                                    <p className="flex items-center gap-2 justify-center text-sm">
                                        <User size={16} className="text-gray-400" /> {user.profile.email}
                                    </p>
                                    <p className="flex items-center gap-2 justify-center text-sm">
                                        <MapPin size={16} className="text-gray-400" /> {user.profile.city || 'Cidade não informada'}
                                    </p>
                                    <p className="flex items-center gap-2 justify-center text-sm">
                                        <Calendar size={16} className="text-gray-400" /> {user.profile.age ? `${user.profile.age} anos` : 'Idade não informada'}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="mt-6 w-full py-2 bg-gray-50 hover:bg-gray-100 border text-gray-700 font-medium rounded-xl transition"
                                >
                                    Editar Perfil
                                </button>
                            </div>
                        ) : (
                            <div className="w-full space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">URL da Foto</label>
                                    <input type="text" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white" placeholder="https://..." />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Nome</label>
                                    <input type="text" value={name} onChange={e => setName(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Cidade</label>
                                    <input type="text" value={city} onChange={e => setCity(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white" />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 uppercase">Idade</label>
                                    <input type="number" value={age} onChange={e => setAge(e.target.value)} className="w-full mt-1 px-3 py-2 border rounded-lg text-sm bg-gray-50 focus:bg-white" />
                                </div>
                                <div className="flex gap-2 pt-2">
                                    <button onClick={() => setIsEditing(false)} className="flex-1 py-2 text-gray-600 border rounded-lg text-sm font-medium hover:bg-gray-50">Cancelar</button>
                                    <button onClick={handleSave} disabled={loading} className="flex-1 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex justify-center items-center">
                                        {loading ? <Loader2 size={16} className="animate-spin" /> : 'Salvar'}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
                            <Target size={32} className="text-blue-200 mb-4" />
                            <p className="text-blue-100 text-sm font-medium">Questões Respondidas</p>
                            <h3 className="text-4xl font-black mt-1">{stats.totalQuestionsAnswered}</h3>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 -mt-4 -mr-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
                            <CheckCircle2 size={32} className="text-emerald-200 mb-4" />
                            <p className="text-emerald-100 text-sm font-medium">Total de Acertos</p>
                            <h3 className="text-4xl font-black mt-1">
                                {stats.totalCorrectAnswers}
                                <span className="text-lg font-medium ml-2 opacity-80">
                                    {stats.totalQuestionsAnswered > 0 ? `(${Math.round(stats.totalCorrectAnswers / stats.totalQuestionsAnswered * 100)}%)` : ''}
                                </span>
                            </h3>
                        </div>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                            <Award size={20} className="text-amber-500" /> Conquistas da Plataforma
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className={`p-4 rounded-xl border-2 text-center transition-colors ${stats.totalQuestionsAnswered >= 50 ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-gray-50 opacity-50 grayscale'}`}>
                                <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-2 relative">
                                    <PlayCircle size={24} />
                                    {stats.totalQuestionsAnswered >= 50 && <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-white" /></div>}
                                </div>
                                <p className="font-bold text-sm text-gray-800 leading-tight">Iniciante</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase">50 Questões</p>
                            </div>

                            <div className={`p-4 rounded-xl border-2 text-center transition-colors ${stats.totalCorrectAnswers >= 100 ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-gray-50 opacity-50 grayscale'}`}>
                                <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-2 relative">
                                    <Target size={24} />
                                    {stats.totalCorrectAnswers >= 100 && <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-white" /></div>}
                                </div>
                                <p className="font-bold text-sm text-gray-800 leading-tight">Especialista</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase">100 Acertos</p>
                            </div>

                            <div className={`p-4 rounded-xl border-2 text-center transition-colors ${stats.modulesCompleted.length >= 2 ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-gray-50 opacity-50 grayscale'}`}>
                                <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center mx-auto mb-2 relative">
                                    <BrainCircuit size={24} />
                                    {stats.modulesCompleted.length >= 2 && <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-white" /></div>}
                                </div>
                                <p className="font-bold text-sm text-gray-800 leading-tight">Estudante</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase">2 Módulos 100%</p>
                            </div>

                            <div className={`p-4 rounded-xl border-2 text-center transition-colors ${stats.modulesCompleted.length >= 5 ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-gray-50 opacity-50 grayscale'}`}>
                                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-2 relative">
                                    <Award size={24} />
                                    {stats.modulesCompleted.length >= 5 && <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-0.5"><CheckCircle2 size={12} className="text-white" /></div>}
                                </div>
                                <p className="font-bold text-sm text-gray-800 leading-tight">Lenda</p>
                                <p className="text-[10px] text-gray-500 mt-1 uppercase">Todos Módulos</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

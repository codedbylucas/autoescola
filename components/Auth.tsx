import React, { useState } from 'react';
import { UserAccount } from '../services/mockDb';
import { authService } from '../services/authService';
import { GraduationCap, ArrowRight, Lock, Mail, User, Loader2 } from 'lucide-react';

interface AuthProps {
    onAuthSuccess: (user: UserAccount) => void;
}

export const Auth: React.FC<AuthProps> = ({ onAuthSuccess }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (isLogin) {
                const user = await authService.login(email, password);
                if (user) {
                    onAuthSuccess(user);
                } else {
                    setError("Credenciais inválidas ou usuário não encontrado.");
                }
            } else {
                const user = await authService.register(name, email, password);
                onAuthSuccess(user);
            }
        } catch (err: any) {
            setError(err.message || "Ocorreu um erro na autenticação.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden animate-fadeIn">
                <div className="bg-blue-600 p-8 text-center text-white">
                    <div className="inline-block bg-white/20 p-3 rounded-xl mb-4">
                        <GraduationCap size={40} />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">AutoAI Pro</h1>
                    <p className="opacity-80 text-sm mt-2">Sua jornada para a CNH começa aqui</p>
                </div>

                <div className="p-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-6">
                        {isLogin ? 'Bem-vindo de volta' : 'Crie sua conta'}
                    </h2>

                    {error && (
                        <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 border border-red-100">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nome Completo</label>
                                <div className="relative">
                                    <User size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                    <input
                                        type="text"
                                        required
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                        placeholder="João Silva"
                                    />
                                </div>
                            </div>
                        )}

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <div className="relative">
                                <Mail size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    placeholder="voce@email.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
                            <div className="relative">
                                <Lock size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 rounded-xl border-gray-200 border bg-gray-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition-all duration-200"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        {isLogin && (
                            <div className="text-right">
                                <button type="button" className="text-sm text-blue-600 hover:underline font-medium">
                                    Esqueceu a senha?
                                </button>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors shadow-lg shadow-blue-200 flex items-center justify-center gap-2 mt-4"
                        >
                            {loading ? <Loader2 size={20} className="animate-spin" /> : (
                                <>
                                    {isLogin ? 'Entrar na plataforma' : 'Criar minha conta'}
                                    <ArrowRight size={20} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm text-gray-500">
                        {isLogin ? "Ainda não tem conta?" : "Já possui conta?"}{" "}
                        <button
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-blue-600 font-bold hover:underline"
                        >
                            {isLogin ? "Cadastre-se" : "Faça login"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

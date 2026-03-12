import React, { useState, useEffect, useMemo, Component, ErrorInfo } from 'react';
import { ModuleId, UserProgress, TestResult, Question } from './types';
import { MODULES_INFO, MOCK_QUESTIONS } from './constants';

interface ErrorBoundaryState {
  hasError: boolean;
  error: any;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: any): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-50 text-red-900 min-h-screen">
          <h2 className="text-2xl font-bold mb-4">Erro Crítico na Renderização</h2>
          <pre className="whitespace-pre-wrap">{this.state.error?.toString()}</pre>
        </div>
      );
    }
    return this.props.children;
  }
}
import {
  LayoutDashboard,
  BookOpen,
  CheckCircle2,
  BarChart3,
  GraduationCap,
  ArrowRight,
  AlertTriangle,
  Clock,
  ChevronLeft,
  ClipboardCheck,
  Loader2,
  Trophy,
  User as UserIcon,
  LogOut
} from 'lucide-react';
import { getAptitudeAnalysis, generateStudyContent, getPedagogicalFeedback } from './services/geminiService';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

import { authService } from './services/authService';
import { userService } from './services/userService';
import { UserAccount } from './services/mockDb';
import { Auth } from './components/Auth';
import { Profile } from './components/Profile';
import { Ranking } from './components/Ranking';

// --- Sub-components ---

const ProgressBar = ({ progress }: { progress: number }) => (
  <div className="w-full bg-gray-200 rounded-full h-2.5">
    <div
      className="bg-blue-600 h-2.5 rounded-full transition-all duration-500"
      style={{ width: `${progress}%` }}
    ></div>
  </div>
);

const App: React.FC = () => {
  // Auth State
  const [currentUser, setCurrentUser] = useState<UserAccount | null>(null);
  const [isInitializingAuth, setIsInitializingAuth] = useState(true);

  // App Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'study' | 'test' | 'analytics' | 'profile' | 'ranking'>('dashboard');
  const [selectedModule, setSelectedModule] = useState<ModuleId | null>(null);

  // Cache 
  const [studyCache, setStudyCache] = useState<Record<string, string>>({});

  // Active View States
  const [currentStudyContent, setCurrentStudyContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [testMode, setTestMode] = useState<{ active: boolean; currentQuestionIndex: number; answers: number[]; results?: TestResult | null, startTime: number }>({
    active: false,
    currentQuestionIndex: 0,
    answers: [],
    results: null,
    startTime: 0
  });

  const [aptitudeMessage, setAptitudeMessage] = useState<string>("");

  useEffect(() => {
    // Check auto-login on mount
    const initAuth = async () => {
      try {
        console.log("Starting Supabase auth init...");
        const user = await authService.getCurrentUser();
        console.log("Auth init finished, user:", user);
        if (user) setCurrentUser(user);
      } catch (err) {
        console.error("Auth init error details:", err);
      } finally {
        setIsInitializingAuth(false);
      }
    };
    initAuth();

    const cachedStudy = localStorage.getItem('detran_study_cache');
    if (cachedStudy) setStudyCache(JSON.parse(cachedStudy));
  }, []);

  useEffect(() => {
    localStorage.setItem('detran_study_cache', JSON.stringify(studyCache));
  }, [studyCache]);

  const handleLogout = async () => {
    await authService.logout();
    setCurrentUser(null);
  }

  const handleStartStudy = async (moduleId: ModuleId) => {
    setSelectedModule(moduleId);
    setActiveTab('study');

    if (studyCache[moduleId]) {
      setCurrentStudyContent(studyCache[moduleId]);
      return;
    }

    setIsLoading(true);
    const content = await generateStudyContent(moduleId);

    setStudyCache(prev => ({ ...prev, [moduleId]: content }));
    setCurrentStudyContent(content);
    setIsLoading(false);
  };

  const handleStartTest = (moduleId: ModuleId) => {
    setSelectedModule(moduleId);
    setTestMode({
      active: true,
      currentQuestionIndex: 0,
      answers: [],
      results: null,
      startTime: Date.now()
    });
    setActiveTab('test');
  };

  const currentQuestions = useMemo(() => {
    if (!selectedModule) return [];
    if (selectedModule === ModuleId.SIMULADO_FINAL) return [...MOCK_QUESTIONS].sort(() => Math.random() - 0.5);
    return MOCK_QUESTIONS.filter(q => q.module === selectedModule);
  }, [selectedModule]);

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...testMode.answers, optionIndex];
    if (testMode.currentQuestionIndex < currentQuestions.length - 1) {
      setTestMode({
        ...testMode,
        currentQuestionIndex: testMode.currentQuestionIndex + 1,
        answers: newAnswers
      });
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = async (finalAnswers: number[]) => {
    const durationSeconds = Math.floor((Date.now() - testMode.startTime) / 1000);
    const correctCount = finalAnswers.reduce((acc, ans, idx) =>
      ans === currentQuestions[idx].correctAnswer ? acc + 1 : acc, 0
    );

    const result: TestResult = {
      score: correctCount,
      total: currentQuestions.length,
      questions: currentQuestions.map((q, idx) => ({
        ...q,
        userAnswer: finalAnswers[idx]
      })),
      durationSeconds,
      date: Date.now()
    };

    if (currentUser && selectedModule) {
      // Save to external DB (localStorage mock) and update local Auth User state
      const updatedStats = await userService.saveTestResult(currentUser.profile.email, selectedModule, result);
      setCurrentUser(prev => prev ? { ...prev, stats: updatedStats } : null);
    }

    setTestMode(prev => ({ ...prev, results: result }));

    // Se for o simulado final, pode usar a Gemini API pra checar se a pessoa tá pronta 
    if (selectedModule === ModuleId.SIMULADO_FINAL && currentUser) {
      // Create a simplified UserProgress object to pass to Gemini
      const progObj: UserProgress = {
        completedModules: currentUser.stats.modulesCompleted,
        scores: currentUser.stats.scores,
        errorPatterns: currentUser.stats.errorPatterns,
        lastActivity: currentUser.stats.lastActivity,
        totalTimeSeconds: currentUser.stats.totalTimeSeconds
      }
      const msg = await getAptitudeAnalysis(progObj);
      setAptitudeMessage(msg);
    }
  };

  const radarData = useMemo(() => {
    if (!currentUser) return [];
    return MODULES_INFO.filter(m => m.id !== ModuleId.SIMULADO_FINAL).map(m => {
      const scores = currentUser.stats.scores[m.id as ModuleId] || [];
      const avg = scores.length > 0 ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
      return {
        subject: m.name,
        A: avg,
        fullMark: 100
      };
    });
  }, [currentUser]);

  // --- Views ---

  const DashboardView = () => {
    if (!currentUser) return null;
    const { stats } = currentUser;

    return (
      <div className="space-y-6 animate-fadeIn pb-20 md:pb-0">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Seu Progresso de Condutor</h1>
            <p className="text-sm md:text-base text-gray-500">Acompanhe sua jornada até a CNH, {currentUser.profile.name.split(' ')[0]}.</p>
          </div>
          <div className="md:text-right">
            <div className="text-xs md:text-sm font-medium text-blue-600 bg-blue-50 px-3 py-1 rounded-full inline-block">
              {stats.modulesCompleted.length} de 5 Módulos
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {MODULES_INFO.map(module => {
            const isDone = stats.modulesCompleted.includes(module.id as ModuleId);
            const lastScore = stats.scores[module.id as ModuleId]?.slice(-1)[0] || 0;

            return (
              <div key={module.id} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-2 rounded-lg ${isDone ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                    {React.cloneElement(module.icon as React.ReactElement, { size: 24 })}
                  </div>
                  {isDone && <CheckCircle2 className="text-green-500" size={20} />}
                </div>
                <h3 className="font-bold text-lg text-gray-800">{module.name}</h3>
                <p className="text-sm text-gray-500 mb-4 h-10 line-clamp-2">{module.description}</p>

                <div className="mb-4">
                  <div className="flex justify-between text-xs mb-1">
                    <span>Domínio</span>
                    <span>{Math.round(lastScore)}%</span>
                  </div>
                  <ProgressBar progress={lastScore} />
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleStartStudy(module.id as ModuleId)}
                    className="flex-1 text-sm bg-gray-50 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-lg border transition-colors flex items-center justify-center gap-2"
                  >
                    <BookOpen size={16} /> Estudar
                  </button>
                  <button
                    onClick={() => handleStartTest(module.id as ModuleId)}
                    className="flex-1 text-sm bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2"
                  >
                    <ClipboardCheck size={16} /> Testar
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {aptitudeMessage && (
          <div className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl flex items-center gap-6">
            <div className="bg-white/20 p-4 rounded-full">
              <GraduationCap size={40} />
            </div>
            <div>
              <h2 className="text-xl font-bold mb-1">Diagnóstico AI de Aptidão</h2>
              <p className="opacity-90 leading-relaxed whitespace-pre-line">{aptitudeMessage}</p>
            </div>
          </div>
        )}
      </div>
    );
  };

  const StudyView = () => (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      <button
        onClick={() => setActiveTab('dashboard')}
        className="flex items-center text-gray-600 hover:text-blue-600 font-medium transition-colors"
      >
        <ChevronLeft size={20} /> Voltar ao Início
      </button>

      <div className="bg-white p-4 md:p-8 rounded-2xl shadow-sm border border-gray-100 min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-10 md:py-20 space-y-4">
            <Loader2 className="animate-spin text-blue-600" size={40} md:size={48} />
            <div className="text-center px-4">
              <p className="text-lg md:text-xl font-bold text-gray-800">Preparando sua aula...</p>
              <p className="text-sm md:text-gray-500">Nossa IA está organizando os pontos que mais caem na prova.</p>
            </div>
            <div className="w-64 space-y-3 mt-8">
              <div className="h-4 bg-gray-100 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-100 rounded animate-pulse w-5/6"></div>
              <div className="h-4 bg-gray-100 rounded animate-pulse w-4/6"></div>
            </div>
          </div>
        ) : (
          <div className="prose prose-blue max-w-none">
            <div className="whitespace-pre-line text-gray-700 leading-relaxed">
              {currentStudyContent?.split('\n').map((line, i) => {
                if (line.includes('⚠ CAI NA PROVA')) {
                  return <div key={i} className="bg-amber-50 border-l-4 border-amber-400 p-4 my-4 font-bold text-amber-800 flex items-center gap-2 rounded-r-lg">
                    <AlertTriangle size={18} className="flex-shrink-0" /> {line}
                  </div>;
                }
                if (line.startsWith('#')) {
                  return <h2 key={i} className="text-2xl font-bold text-gray-900 mt-6 mb-3">{line.replace(/^#+ /, '')}</h2>;
                }
                if (line.trim().startsWith('-') || line.trim().startsWith('•')) {
                  return <li key={i} className="ml-4 mb-1 list-disc">{line.replace(/^[-•] /, '')}</li>;
                }
                return <p key={i} className="mb-3">{line}</p>;
              })}
            </div>
            <div className="mt-8 pt-6 border-t flex justify-end">
              <button
                onClick={() => handleStartTest(selectedModule!)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-200 transition-all active:scale-95"
              >
                Tudo Pronto! Vamos ao Teste <ArrowRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const TestView = () => {
    if (!testMode.active) return null;

    if (testMode.results) {
      const isApproved = (testMode.results.score / testMode.results.total) >= 0.7;
      return (
        <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn pb-24 md:pb-10">
          <div className={`p-6 md:p-8 rounded-2xl shadow-xl text-white flex flex-col md:flex-row gap-4 md:justify-between md:items-center ${isApproved ? 'bg-green-600' : 'bg-red-500'}`}>
            <div>
              <h2 className="text-2xl md:text-3xl font-bold">{isApproved ? 'Aprovado!' : 'Continue Estudando'}</h2>
              <p className="text-white/80 mt-1 text-sm md:text-base">Sua nota: {testMode.results.score} de {testMode.results.total} ({Math.round((testMode.results.score / testMode.results.total) * 100)}%)</p>
            </div>
            <div className="bg-white/20 p-3 md:p-4 rounded-xl text-center">
              <p className="text-[10px] md:text-xs uppercase font-bold tracking-wider opacity-70">Resultado</p>
              <p className="text-xl md:text-2xl font-bold">{isApproved ? 'APTO' : 'NÃO APTO'}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-gray-800">Revisão Pedagógica das Questões</h3>
          <div className="space-y-4">
            {testMode.results.questions.map((q, idx) => (
              <div key={idx} className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-sm font-bold text-gray-400">QUESTÃO {idx + 1}</span>
                  {q.userAnswer === q.correctAnswer ?
                    <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded font-bold">ACERTO</span> :
                    <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded font-bold">ERRO</span>
                  }
                </div>
                <p className="text-gray-800 font-medium mb-4">{q.text}</p>

                <div className="grid grid-cols-1 gap-2 mb-4">
                  {q.options.map((opt, oIdx) => (
                    <div key={oIdx} className={`p-3 rounded-lg text-sm border ${oIdx === q.correctAnswer ? 'bg-green-50 border-green-200 text-green-800' :
                      oIdx === q.userAnswer ? 'bg-red-50 border-red-200 text-red-800' : 'bg-gray-50 border-gray-100 text-gray-500'
                      }`}>
                      {opt} {oIdx === q.correctAnswer && "✓"}
                    </div>
                  ))}
                </div>

                {q.userAnswer !== q.correctAnswer && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <p className="text-sm font-bold text-blue-800 mb-1">Feedback Especialista:</p>
                    <p className="text-sm text-blue-700 italic">"{q.explanation}"</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setActiveTab('ranking')}
              className="w-full md:flex-1 bg-amber-500 text-white font-bold py-4 rounded-xl hover:bg-amber-600 transition-colors shadow-lg shadow-amber-200 flex items-center justify-center gap-2"
            >
              <Trophy size={20} /> Ver Ranking e Posição
            </button>
            <button
              onClick={() => setActiveTab('dashboard')}
              className="w-full md:flex-1 bg-white text-gray-700 font-bold py-4 rounded-xl border hover:bg-gray-50 transition-colors"
            >
              Voltar ao Início
            </button>
          </div>
        </div>
      );
    }

    const currentQ = currentQuestions[testMode.currentQuestionIndex];

    if (!currentQ) return <div className="text-center py-10 text-gray-500">Erro ao carregar questões.</div>;

    return (
      <div className="max-w-2xl mx-auto space-y-6 animate-fadeIn py-6 md:py-10 pb-24 md:pb-10">
        <div className="flex justify-between items-center text-sm font-medium text-gray-500 px-2 md:px-0">
          <span className="truncate max-w-[150px]">{MODULES_INFO.find(m => m.id === selectedModule)?.name}</span>
          <span className="flex items-center gap-2 whitespace-nowrap"><Clock size={16} /> {testMode.currentQuestionIndex + 1}/{currentQuestions.length}</span>
        </div>

        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-xl border border-gray-100 relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gray-100 rounded-t-2xl overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all duration-300"
              style={{ width: `${((testMode.currentQuestionIndex + 1) / currentQuestions.length) * 100}%` }}
            ></div>
          </div>

          <p className="text-[10px] md:text-xs font-bold text-blue-600 mb-4 uppercase tracking-widest mt-2 px-1">Questão {testMode.currentQuestionIndex + 1} de {currentQuestions.length}</p>
          <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-6 md:mb-8 leading-tight px-1">{currentQ.text}</h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-blue-500 hover:bg-blue-50 transition-all group relative active:scale-[0.99]"
              >
                <div className="flex items-start">
                  <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-lg bg-gray-100 group-hover:bg-blue-200 text-gray-600 group-hover:text-blue-700 font-bold mr-3 md:mr-4 text-xs md:text-sm transition-colors flex-shrink-0">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-gray-700 font-medium text-sm md:text-base">{opt}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const AnalyticsView = () => {
    if (!currentUser) return null;
    const { stats } = currentUser;

    return (
      <div className="space-y-8 animate-fadeIn">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <BarChart3 size={20} className="text-blue-600" /> Domínio por Conteúdo
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#6b7280' }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} />
                  <Radar name="Aluno" dataKey="A" stroke="#2563eb" fill="#2563eb" fillOpacity={0.6} />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Clock size={20} className="text-blue-600" /> Histórico de Simulados
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={(stats.scores[ModuleId.SIMULADO_FINAL] || []).map((s, i) => ({ name: `T${i + 1}`, score: s }))}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={3} dot={{ r: 6, fill: '#2563eb' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Consistência de Erros</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(stats.errorPatterns).map(([type, count]) => (
              <div key={type} className="bg-gray-50 p-4 rounded-xl text-center">
                <p className="text-2xl font-bold text-gray-800">{count}</p>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-wider">{type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  if (isInitializingAuth) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={48} />
    </div>;
  }

  if (!currentUser) {
    return <Auth onAuthSuccess={(user) => setCurrentUser(user)} />;
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
        {/* Sidebar - Navigation */}
        {/* Sidebar - Desktop Navigation */}
        <aside className="hidden md:flex md:w-64 bg-white border-r border-gray-200 flex-shrink-0 z-20 flex-col min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-blue-600 p-2 rounded-lg text-white">
                <GraduationCap size={24} />
              </div>
              <span className="font-bold text-xl text-gray-800 tracking-tight">AutoAI Pro</span>
            </div>

            <nav className="space-y-2">
              {[
                { id: 'dashboard', label: 'Painel', icon: <LayoutDashboard size={20} /> },
                { id: 'analytics', label: 'Desempenho', icon: <BarChart3 size={20} /> },
                { id: 'ranking', label: 'Ranking', icon: <Trophy size={20} /> },
                { id: 'profile', label: 'Meu Perfil', icon: <UserIcon size={20} /> },
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id as any); setTestMode({ ...testMode, active: false }); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === item.id
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
                    : 'text-gray-500 hover:bg-gray-50'
                    }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-gray-100 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center overflow-hidden flex-shrink-0">
                {currentUser.profile.photoUrl ? (
                  <img src={currentUser.profile.photoUrl} alt="Perfil" className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-sm uppercase">{currentUser.profile.name.substring(0, 2)}</span>
                )}
              </div>
              <div className="flex flex-col truncate">
                <span className="text-sm font-bold text-gray-800 truncate">{currentUser.profile.name}</span>
                <span className="text-xs text-gray-500 truncate">{currentUser.profile.email}</span>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 py-2 border rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
            >
              <LogOut size={16} /> Sair
            </button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-gray-100 px-4 py-3 sticky top-0 z-30 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <GraduationCap size={18} />
            </div>
            <span className="font-bold text-lg text-gray-800">AutoAI Pro</span>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-gray-500 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
          </button>
        </header>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 px-2 py-2 flex justify-around items-center z-40 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
          {[
            { id: 'dashboard', label: 'Início', icon: <LayoutDashboard size={20} /> },
            { id: 'analytics', label: 'Estat.', icon: <BarChart3 size={20} /> },
            { id: 'ranking', label: 'Ranking', icon: <Trophy size={20} /> },
            { id: 'profile', label: 'Perfil', icon: <UserIcon size={20} /> },
          ].map(item => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id as any); setTestMode({ ...testMode, active: false }); }}
              className={`flex flex-col items-center gap-1 transition-all flex-1 py-1 ${activeTab === item.id
                ? 'text-blue-600'
                : 'text-gray-400'
                }`}
            >
              {item.icon}
              <span className="text-[10px] font-bold">{item.label}</span>
              {activeTab === item.id && <span className="w-1 h-1 rounded-full bg-blue-600 mt-0.5"></span>}
            </button>
          ))}
        </nav>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 overflow-y-auto">
          <div className="max-w-6xl mx-auto">
            {activeTab === 'dashboard' && <DashboardView />}
            {activeTab === 'study' && <StudyView />}
            {activeTab === 'test' && <TestView />}
            {activeTab === 'analytics' && <AnalyticsView />}
            {activeTab === 'profile' && <Profile user={currentUser!} onUpdateUser={(u) => setCurrentUser(u)} />}
            {activeTab === 'ranking' && <Ranking />}
          </div>
        </main>

        {/* Floating Action for Mobile */}
        {activeTab !== 'test' && (
          <div className="fixed bottom-20 right-6 md:bottom-6 md:right-6 md:hidden">
            <button
              onClick={() => handleStartTest(ModuleId.SIMULADO_FINAL)}
              className="bg-blue-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center animate-bounce"
            >
              <ClipboardCheck size={28} />
            </button>
          </div>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default App;

import { ErrorType, ModuleId, Question, TestResult, UserProgress } from '../types';

// Mock Interfaces
export interface UserProfile {
  id: string;
  name: string;
  email: string;
  city?: string;
  age?: number;
  photoUrl?: string; // Base64 or simple avatars
  createdAt: number;
}

export interface UserStats {
  totalQuestionsAnswered: number;
  totalCorrectAnswers: number;
  modulesCompleted: ModuleId[];
  scores: Record<ModuleId, number[]>; // percentage scores history per module
  errorPatterns: Record<ErrorType, number>;
  totalTimeSeconds: number;
  lastActivity: number;
}

export interface UserAccount {
  profile: UserProfile;
  stats: UserStats;
}

export interface RankingEntry {
  userId: string;
  name: string;
  photoUrl?: string;
  correctAnswers: number;
  totalQuestions: number;
  timeSpentSeconds: number;
  percentage: number;
}

// Database Layer Simulation
const DB_KEY = 'autoescola_db';

interface DatabaseSchema {
  users: Record<string, UserAccount>; // email -> account
  currentUserEmail: string | null;
  // Store rankings globally across all users for the mock to work
  moduleRankings: Record<ModuleId, RankingEntry[]>;
}

const getInitialDB = (): DatabaseSchema => ({
  users: {},
  currentUserEmail: null,
  moduleRankings: {
    [ModuleId.SINALIZACAO]: [],
    [ModuleId.LEGISLACAO]: [],
    [ModuleId.DIRECAO_DEFENSIVA]: [],
    [ModuleId.PRIMEIROS_SOCORROS]: [],
    [ModuleId.MEIO_AMBIENTE]: [],
    [ModuleId.SIMULADO_FINAL]: []
  }
});

// Helper functions for DB access
export const getDB = (): DatabaseSchema => {
  try {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      const initial = getInitialDB();
      // Generate some fake users for the ranking to look alive right away
      initial.moduleRankings = generateFakeRankings();
      saveDB(initial);
      return initial;
    }
    return JSON.parse(data);
  } catch (e) {
    return getInitialDB();
  }
};

export const saveDB = (db: DatabaseSchema) => {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
};

const generateFakeRankings = () => {
  const fakeUsers = [
    { name: 'Maria Silva', photoUrl: 'https://i.pravatar.cc/150?u=maria', correct: 28, total: 30, time: 240 },
    { name: 'João Santos', photoUrl: 'https://i.pravatar.cc/150?u=joao', correct: 26, total: 30, time: 310 },
    { name: 'Ana Oliveira', photoUrl: 'https://i.pravatar.cc/150?u=ana', correct: 24, total: 30, time: 280 },
    { name: 'Carlos Costa', photoUrl: 'https://i.pravatar.cc/150?u=carlos', correct: 20, total: 30, time: 190 },
    { name: 'Beatriz Lima', photoUrl: 'https://i.pravatar.cc/150?u=beatriz', correct: 22, total: 30, time: 400 },
  ];

  const rankings: Record<string, RankingEntry[]> = {};
  
  Object.values(ModuleId).forEach(moduleId => {
    rankings[moduleId] = fakeUsers.map((user, i) => {
      // Add some randomness to their scores per module
      const correct = Math.max(10, Math.min(user.total, user.correct - Math.floor(Math.random() * 5)));
      return {
        userId: `fake_user_${i}`,
        name: user.name,
        photoUrl: user.photoUrl,
        correctAnswers: correct,
        totalQuestions: user.total,
        timeSpentSeconds: user.time + Math.floor(Math.random() * 100),
        percentage: (correct / user.total) * 100
      };
    }).sort((a, b) => {
       if (b.correctAnswers !== a.correctAnswers) return b.correctAnswers - a.correctAnswers;
       return a.timeSpentSeconds - b.timeSpentSeconds; // Tie-breaker
    });
  });
  
  return rankings as Record<ModuleId, RankingEntry[]>;
}

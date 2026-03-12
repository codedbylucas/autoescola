
export enum ModuleId {
  SINALIZACAO = 'm1',
  LEGISLACAO = 'm2',
  DIRECAO_DEFENSIVA = 'm3',
  PRIMEIROS_SOCORROS = 'm4',
  MEIO_AMBIENTE = 'm5',
  SIMULADO_FINAL = 'm_final'
}

export enum ErrorType {
  CONCEPTUAL = 'Conceitual',
  DISTRACTION = 'Distração',
  TRAP = 'Pegadinha',
  INTERPRETATION = 'Interpretação'
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  module: ModuleId;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface UserProgress {
  completedModules: ModuleId[];
  scores: Record<ModuleId, number[]>;
  errorPatterns: Record<ErrorType, number>;
  lastActivity: number;
  totalTimeSeconds: number;
}

export interface TestResult {
  score: number;
  total: number;
  questions: (Question & { userAnswer: number; errorType?: ErrorType; aiFeedback?: string })[];
  durationSeconds: number;
  date: number;
}

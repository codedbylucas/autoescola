
import { GoogleGenAI, Type } from "@google/genai";
import { ModuleId, ErrorType } from "../types";

const getApiKey = () => {
  return (import.meta as any).env.VITE_GEMINI_API_KEY || (process.env as any).API_KEY;
};

const getAI = () => {
  const key = getApiKey();
  if (!key) {
    console.warn("Gemini API Key missing. AI features will be mocked.");
    return null;
  }
  return new GoogleGenAI({ apiKey: key });
};

const ai = getAI();

export const getPedagogicalFeedback = async (question: string, userAnswer: string, correctAnswer: string, explanation: string) => {
  if (!ai) {
    return "Feedback (Simulado): Você errou, mas continue tentando! Revise o material de este módulo.";
  }

  const prompt = `Como um instrutor especialista do DETRAN, analise este erro de um aluno:
  Questão: "${question}"
  Resposta do Aluno: "${userAnswer}"
  Resposta Correta: "${correctAnswer}"
  Explicação Técnica: "${explanation}"

  Forneça um feedback curto (máximo 3 frases) em tom motivador. Identifique se o erro foi por "Pegadinha", "Falta de Atenção", "Erro Conceitual" ou "Interpretação". Use linguagem clara.`;

  try {
    const model = (ai as any).getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Gemini Feedback Error:", error);
    return "Analise técnica: Você errou um detalhe importante do CTB. Revise o material deste módulo.";
  }
};

export const getAptitudeAnalysis = async (performanceData: any) => {
  if (!ai) {
    return "Análise (Simulada): Seu desempenho está evoluindo. Continue praticando para garantir 100% de sucesso!";
  }

  const prompt = `Analise o desempenho deste aluno para a prova do DETRAN:
  Dados: ${JSON.stringify(performanceData)}

  Determine se ele está "APTO" ou "NÃO APTO".
  Se apto, dê uma mensagem de encorajamento final.
  Se não apto, liste os 2 principais tópicos que ele deve reforçar com urgência.
  Seja direto e profissional.`;

  try {
    const model = (ai as any).getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return "Continue estudando para garantir sua aprovação!";
  }
};

export const generateStudyContent = async (moduleId: ModuleId) => {
  if (!ai) {
    return "Conteúdo de Estudo (Simulado): Este módulo cobre os tópicos essenciais para sua aprovação. Revise as sinalizações e regras de preferência.";
  }

  const prompt = `Gere um documento de estudo completo para o módulo do DETRAN: ${moduleId}.
  Inclua:
  1. Título impactante.
  2. 3 Pontos "⚠ CAI NA PROVA".
  3. Resumo estruturado com tópicos.
  4. Uma "Dica de Ouro" de quem conhece a prova.
  Linguagem: Simples, focada em aprovação.`;

  try {
    const model = (ai as any).getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    return "Erro ao carregar conteúdo. Por favor, tente novamente.";
  }
};

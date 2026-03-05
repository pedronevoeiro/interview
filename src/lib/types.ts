export interface CandidateInfo {
  name: string;
  date: string;
  interviewer: string;
}

export interface PerfilAnswers {
  [questionId: number]: number; // 1-5
}

export interface WritingTest {
  response: string;
  score: number; // 0-30, assigned by interviewer
}

export interface BonusQuestion {
  response: string;
  score: number; // 0-10, assigned by interviewer
}

export interface SimulationScores {
  controleConversa: number;
  perguntasFeitas: number;
  argumentacao: number;
  confianca: number;
  tentativaFechamento: number;
}

export interface WhatsAppAnswer {
  priority: number; // 1-10
  response: string;
}

export interface WhatsAppTest {
  answers: { [messageId: string]: WhatsAppAnswer };
}

export interface Observations {
  strongSigns: string[];
  redFlags: string[];
}

export interface AssessmentState {
  candidate: CandidateInfo;
  perfil: PerfilAnswers;
  writing: WritingTest;
  bonus: BonusQuestion;
  whatsapp: WhatsAppTest;
  simulation: SimulationScores;
  agilidade: number; // 0-20
  observations: Observations;
}

export interface ScoreBreakdown {
  escrita: number;
  simulacao: number;
  agilidade: number;
  perfil: number;
  organizacao: number;
  total: number;
  classification: string;
}

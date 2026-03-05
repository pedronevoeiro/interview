import type { AssessmentState, ScoreBreakdown } from "./types";

export function scoreProfile(answers: { [key: number]: number }): {
  raw: number;
  scaled: number;
  label: string;
} {
  const values = Object.values(answers);
  const raw = values.reduce((sum, v) => sum + v, 0);

  let scaled: number;
  let label: string;

  if (raw >= 40) {
    scaled = 15;
    label = "Vendedor agressivo (ótimo para volume)";
  } else if (raw >= 35) {
    scaled = 13;
    label = "Acima do ideal";
  } else if (raw >= 30) {
    scaled = 11;
    label = "Vendedor equilibrado";
  } else if (raw >= 20) {
    scaled = 7;
    label = "Vendedor passivo";
  } else {
    scaled = 3;
    label = "Perfil não comercial";
  }

  return { raw, scaled, label };
}

export function scoreSimulation(sim: AssessmentState["simulation"]): number {
  return (
    sim.controleConversa +
    sim.perguntasFeitas +
    sim.argumentacao +
    sim.confianca +
    sim.tentativaFechamento
  );
}

export function detectKeyword(text: string): boolean {
  const last100 = text.trim().slice(-100).toLowerCase();
  return last100.includes("azul");
}

export function calculateTotal(state: AssessmentState): ScoreBreakdown {
  const perfil = scoreProfile(state.perfil).scaled;
  const simulacao = scoreSimulation(state.simulation);
  const escrita = state.writing.score;
  const agilidade = state.agilidade;
  const organizacao = state.bonus.score;

  const total = escrita + simulacao + agilidade + perfil + organizacao;

  let classification: string;
  if (total >= 85) classification = "Vendedor excepcional";
  else if (total >= 70) classification = "Forte candidato";
  else if (total >= 55) classification = "Médio";
  else classification = "Eliminar";

  return { escrita, simulacao, agilidade, perfil, organizacao, total, classification };
}

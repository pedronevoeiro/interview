"use client";

import { useState } from "react";
import type { AssessmentState } from "@/lib/types";
import { StepCandidato } from "./step-candidato";
import { StepPerfil } from "./step-perfil";
import { StepEscrita } from "./step-escrita";
import { StepBonus } from "./step-bonus";
import { StepSimulacao } from "./step-simulacao";
import { StepWhatsApp } from "./step-whatsapp";
import { StepObservacoes } from "./step-observacoes";
import { StepResultado } from "./step-resultado";

const steps = [
  { title: "Dados do Candidato", who: "interviewer" },
  { title: "Perfil Psicológico", who: "candidate" },
  { title: "Teste de Escrita", who: "candidate" },
  { title: "Pergunta Bônus", who: "candidate" },
  { title: "Triagem WhatsApp", who: "candidate" },
  { title: "Simulação de Vendas", who: "interviewer" },
  { title: "Observações", who: "interviewer" },
  { title: "Resultado", who: "both" },
] as const;

const initialState: AssessmentState = {
  candidate: { name: "", date: new Date().toISOString().slice(0, 10), interviewer: "" },
  perfil: {},
  writing: { response: "", score: 0 },
  bonus: { response: "", score: 0 },
  whatsapp: { answers: {} },
  simulation: {
    controleConversa: 0,
    perguntasFeitas: 0,
    argumentacao: 0,
    confianca: 0,
    tentativaFechamento: 0,
  },
  agilidade: 0,
  observations: { strongSigns: [], redFlags: [] },
};

export function WizardShell() {
  const [step, setStep] = useState(0);
  const [state, setState] = useState<AssessmentState>(initialState);

  const currentStep = steps[step];
  const isFirst = step === 0;
  const isLast = step === steps.length - 1;

  const handleReset = () => {
    setState(initialState);
    setStep(0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 no-print">
        <div className="max-w-2xl mx-auto px-4 py-4">
          <h1 className="text-lg font-bold text-gray-800">
            Avaliação de Candidatos
          </h1>
          <p className="text-xs text-gray-500">Winepopper</p>
        </div>
      </header>

      {/* Progress bar */}
      <div className="bg-white border-b border-gray-100 no-print">
        <div className="max-w-2xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-gray-500">
              Etapa {step + 1} de {steps.length}
            </span>
            <span
              className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                currentStep.who === "candidate"
                  ? "bg-blue-100 text-blue-700"
                  : currentStep.who === "interviewer"
                  ? "bg-amber-100 text-amber-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {currentStep.who === "candidate"
                ? "Candidato"
                : currentStep.who === "interviewer"
                ? "Entrevistador"
                : "Resultado"}
            </span>
          </div>
          {/* Step indicators */}
          <div className="flex gap-1">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full transition-colors ${
                  i < step
                    ? "bg-primary"
                    : i === step
                    ? "bg-primary/60"
                    : "bg-gray-200"
                }`}
              />
            ))}
          </div>
          <h2 className="text-sm font-semibold text-gray-700 mt-2">
            {currentStep.title}
          </h2>
        </div>
      </div>

      {/* Step content */}
      <main className="max-w-2xl mx-auto px-4 py-6 pb-24">
        {step === 0 && (
          <StepCandidato
            data={state.candidate}
            onChange={(candidate) => setState({ ...state, candidate })}
          />
        )}
        {step === 1 && (
          <StepPerfil
            data={state.perfil}
            onChange={(perfil) => setState({ ...state, perfil })}
          />
        )}
        {step === 2 && (
          <StepEscrita
            data={state.writing}
            onChange={(writing) => setState({ ...state, writing })}
          />
        )}
        {step === 3 && (
          <StepBonus
            data={state.bonus}
            onChange={(bonus) => setState({ ...state, bonus })}
          />
        )}
        {step === 4 && (
          <StepWhatsApp
            data={state.whatsapp}
            onChange={(whatsapp) => setState({ ...state, whatsapp })}
          />
        )}
        {step === 5 && (
          <StepSimulacao
            simulation={state.simulation}
            agilidade={state.agilidade}
            writing={state.writing}
            bonus={state.bonus}
            whatsapp={state.whatsapp}
            onSimulationChange={(simulation) =>
              setState({ ...state, simulation })
            }
            onAgilidadeChange={(agilidade) =>
              setState({ ...state, agilidade })
            }
            onWritingChange={(writing) =>
              setState({ ...state, writing })
            }
            onBonusChange={(bonus) =>
              setState({ ...state, bonus })
            }
          />
        )}
        {step === 6 && (
          <StepObservacoes
            data={state.observations}
            onChange={(observations) => setState({ ...state, observations })}
          />
        )}
        {step === 7 && (
          <StepResultado state={state} onReset={handleReset} />
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 no-print">
        <div className="max-w-2xl mx-auto px-4 py-3 flex gap-3">
          {!isFirst && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Voltar
            </button>
          )}
          {!isLast && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {step === steps.length - 2 ? "Ver resultado" : "Próximo"}
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

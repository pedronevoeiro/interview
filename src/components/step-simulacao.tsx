"use client";

import { simulationCriteria, simulationScenario, bonusCriteria, whatsappMessages } from "@/lib/questions";
import { detectKeyword } from "@/lib/scoring";
import type { SimulationScores, WritingTest, BonusQuestion, WhatsAppTest } from "@/lib/types";

interface Props {
  simulation: SimulationScores;
  agilidade: number;
  writing: WritingTest;
  bonus: BonusQuestion;
  whatsapp: WhatsAppTest;
  onSimulationChange: (data: SimulationScores) => void;
  onAgilidadeChange: (value: number) => void;
  onWritingChange: (data: WritingTest) => void;
  onBonusChange: (data: BonusQuestion) => void;
}

export function StepSimulacao({
  simulation,
  agilidade,
  writing,
  bonus,
  whatsapp,
  onSimulationChange,
  onAgilidadeChange,
  onWritingChange,
  onBonusChange,
}: Props) {
  const hasKeyword = writing.response.trim().length > 0 && detectKeyword(writing.response);

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        Preenchido pelo <strong>entrevistador</strong> — o candidato <strong>não</strong> deve ver esta tela
      </div>

      {/* Writing test evaluation */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Avaliação do Teste de Escrita</h3>

        {writing.response.trim().length > 0 ? (
          <>
            <div className="rounded bg-gray-50 px-3 py-2 max-h-32 overflow-y-auto">
              <p className="text-xs text-gray-600 whitespace-pre-wrap">{writing.response}</p>
            </div>
            <div className={`rounded-lg px-4 py-3 text-sm border ${
              hasKeyword
                ? "bg-emerald-50 border-emerald-200 text-emerald-800"
                : "bg-red-50 border-red-200 text-red-800"
            }`}>
              <strong>Instrução escondida (&quot;azul&quot;):</strong>{" "}
              {hasKeyword ? "Candidato seguiu a instrução" : "Candidato NÃO seguiu a instrução"}
            </div>
          </>
        ) : (
          <p className="text-sm text-gray-400 italic">Candidato não escreveu resposta</p>
        )}

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Pontuação (0-30):</label>
          <input
            type="number"
            min={0}
            max={30}
            value={writing.score}
            onChange={(e) =>
              onWritingChange({ ...writing, score: Math.min(30, Math.max(0, Number(e.target.value))) })
            }
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <span className="text-sm text-gray-500">/ 30</span>
        </div>
      </div>

      {/* Bonus question evaluation */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Avaliação da Pergunta Bônus (120 leads)</h3>

        {bonus.response.trim().length > 0 ? (
          <div className="rounded bg-gray-50 px-3 py-2 max-h-32 overflow-y-auto">
            <p className="text-xs text-gray-600 whitespace-pre-wrap">{bonus.response}</p>
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Candidato não escreveu resposta</p>
        )}

        <div className="rounded border border-gray-100 bg-gray-50 px-3 py-2">
          <p className="text-xs font-medium text-gray-500 mb-1">Procure na resposta:</p>
          <div className="flex flex-wrap gap-2">
            {bonusCriteria.map((c) => (
              <span key={c} className="text-xs bg-white border border-gray-200 rounded px-2 py-0.5 text-gray-600">{c}</span>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">Organização (0-10):</label>
          <input
            type="number"
            min={0}
            max={10}
            value={bonus.score}
            onChange={(e) =>
              onBonusChange({ ...bonus, score: Math.min(10, Math.max(0, Number(e.target.value))) })
            }
            className="w-24 rounded-lg border border-gray-300 px-3 py-2 text-center text-lg font-bold focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none"
          />
          <span className="text-sm text-gray-500">/ 10</span>
        </div>
      </div>

      {/* WhatsApp test review */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Revisão da Triagem WhatsApp</h3>
        <p className="text-xs text-gray-500">
          Analise a priorização e as respostas do candidato. Considere isso na nota de Agilidade e Organização.
        </p>

        {Object.keys(whatsapp.answers).length > 0 ? (
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {whatsappMessages
              .map((msg) => ({
                msg,
                answer: whatsapp.answers[msg.id],
              }))
              .filter(({ answer }) => answer && (answer.priority > 0 || answer.response))
              .sort((a, b) => (a.answer?.priority || 99) - (b.answer?.priority || 99))
              .map(({ msg, answer }) => (
                <div key={msg.id} className="rounded border border-gray-100 bg-gray-50 px-3 py-2 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">#{answer.priority}</span>
                    <span className="text-xs font-medium text-gray-500">{msg.id}. {msg.sender}</span>
                  </div>
                  <p className="text-xs text-gray-500 italic">{msg.text}</p>
                  {answer.response && (
                    <p className="text-xs text-gray-800 bg-white rounded px-2 py-1 border border-gray-200">
                      {answer.response}
                    </p>
                  )}
                </div>
              ))}
          </div>
        ) : (
          <p className="text-sm text-gray-400 italic">Candidato não respondeu a triagem</p>
        )}
      </div>

      {/* Simulation scenario */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-gray-800">Cenário da Simulação de Vendas</h3>
        <p className="text-sm text-gray-600">{simulationScenario.intro}</p>
        <div className="rounded bg-gray-50 px-3 py-2">
          <p className="text-sm italic text-gray-700">
            &quot;{simulationScenario.opening}&quot;
          </p>
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Observe se o candidato:
          </p>
          {simulationScenario.observe.map((o) => (
            <p key={o} className="text-sm text-gray-600">{o}</p>
          ))}
        </div>
        <div className="space-y-1">
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
            Objeções para jogar:
          </p>
          {simulationScenario.objections.map((obj, i) => (
            <p key={i} className="text-sm italic text-gray-600">
              {i + 1}. &quot;{obj}&quot;
            </p>
          ))}
        </div>
      </div>

      {/* Simulation scoring */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-800">Pontuação da Simulação (1-5 cada)</h3>
        {simulationCriteria.map(({ key, label }) => (
          <div key={key} className="rounded-lg border border-gray-200 bg-white p-4">
            <p className="text-sm font-medium text-gray-700 mb-2">{label}</p>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() =>
                    onSimulationChange({ ...simulation, [key]: n })
                  }
                  className={`w-12 h-12 rounded-lg border-2 text-lg font-bold transition-all cursor-pointer ${
                    simulation[key] === n
                      ? "border-primary bg-primary text-white"
                      : "border-gray-200 bg-white hover:border-primary-light text-gray-600"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Agilidade */}
      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-gray-800">Agilidade (0-20 pontos)</h3>
        <p className="text-xs text-gray-500">
          Avalie a rapidez de raciocínio e resposta do candidato durante toda a entrevista.
        </p>
        <div className="flex items-center gap-3">
          <input
            type="range"
            min={0}
            max={20}
            value={agilidade}
            onChange={(e) => onAgilidadeChange(Number(e.target.value))}
            className="flex-1 accent-primary"
          />
          <span className="w-16 text-center text-lg font-bold text-gray-800">
            {agilidade}/20
          </span>
        </div>
      </div>
    </div>
  );
}

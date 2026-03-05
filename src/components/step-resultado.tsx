"use client";

import { scoreProfile, calculateTotal, detectKeyword } from "@/lib/scoring";
import { whatsappMessages, perfilQuestions } from "@/lib/questions";
import type { AssessmentState } from "@/lib/types";
import { ScoreBadge } from "./score-badge";

interface Props {
  state: AssessmentState;
  onReset: () => void;
}

export function StepResultado({ state, onReset }: Props) {
  const result = calculateTotal(state);
  const profile = scoreProfile(state.perfil);
  const hasKeyword = detectKeyword(state.writing.response);

  const rows = [
    { label: "Teste de escrita", score: result.escrita, max: 30 },
    { label: "Simulação de vendas", score: result.simulacao, max: 25 },
    { label: "Agilidade", score: result.agilidade, max: 20 },
    { label: "Perfil psicológico", score: result.perfil, max: 15 },
    { label: "Organização", score: result.organizacao, max: 10 },
  ];

  return (
    <div className="space-y-6">
      {/* Print header - only visible when printing */}
      <div className="print-only mb-6">
        <h1 className="text-xl font-bold">Avaliação de Candidato a Vendedor</h1>
        <p className="text-sm text-gray-600">Winepopper</p>
      </div>

      {/* Candidate info */}
      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <div className="grid grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Candidato</span>
            <p className="font-medium">{state.candidate.name || "—"}</p>
          </div>
          <div>
            <span className="text-gray-500">Entrevistador</span>
            <p className="font-medium">{state.candidate.interviewer || "—"}</p>
          </div>
          <div>
            <span className="text-gray-500">Data</span>
            <p className="font-medium">{state.candidate.date || "—"}</p>
          </div>
        </div>
      </div>

      {/* Score badge */}
      <div className="flex justify-center py-4">
        <ScoreBadge total={result.total} classification={result.classification} />
      </div>

      {/* Breakdown */}
      <div className="rounded-lg border border-gray-200 bg-white overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-4 py-3 font-medium text-gray-600">Critério</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Pontos</th>
              <th className="text-center px-4 py-3 font-medium text-gray-600">Máximo</th>
              <th className="text-right px-4 py-3 font-medium text-gray-600">%</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-gray-100">
                <td className="px-4 py-3 text-gray-800">{row.label}</td>
                <td className="px-4 py-3 text-center font-bold">{row.score}</td>
                <td className="px-4 py-3 text-center text-gray-500">{row.max}</td>
                <td className="px-4 py-3 text-right text-gray-600">
                  {row.max > 0 ? Math.round((row.score / row.max) * 100) : 0}%
                </td>
              </tr>
            ))}
            <tr className="bg-gray-50 font-bold">
              <td className="px-4 py-3">Total</td>
              <td className="px-4 py-3 text-center text-lg">{result.total}</td>
              <td className="px-4 py-3 text-center">100</td>
              <td className="px-4 py-3 text-right">{result.total}%</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Profile */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">Perfil psicológico</h4>
          <p className="text-sm text-gray-600">
            Score bruto: <strong>{profile.raw}/50</strong>
          </p>
          <p className="text-sm text-gray-600">{profile.label}</p>
        </div>

        {/* Hidden instruction */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">Instrução escondida</h4>
          <p className={`text-sm font-medium ${hasKeyword ? "text-emerald-600" : "text-red-600"}`}>
            {hasKeyword ? "Seguiu a instrução (\"azul\")" : "NÃO seguiu a instrução"}
          </p>
        </div>

        {/* Strong signs */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-emerald-700">Sinais positivos</h4>
          {state.observations.strongSigns.length > 0 ? (
            <ul className="space-y-1">
              {state.observations.strongSigns.map((s) => (
                <li key={s} className="text-sm text-gray-600">{s}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Nenhum selecionado</p>
          )}
        </div>

        {/* Red flags */}
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-red-700">Red flags</h4>
          {state.observations.redFlags.length > 0 ? (
            <ul className="space-y-1">
              {state.observations.redFlags.map((f) => (
                <li key={f} className="text-sm text-red-600">{f}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-400">Nenhuma identificada</p>
          )}
        </div>
      </div>

      {/* Candidate responses */}
      {state.writing.response && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">Resposta do teste de escrita</h4>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{state.writing.response}</p>
        </div>
      )}

      {state.bonus.response && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">Resposta da pergunta bônus (120 leads)</h4>
          <p className="text-sm text-gray-600 whitespace-pre-wrap">{state.bonus.response}</p>
        </div>
      )}

      {/* WhatsApp test */}
      {Object.keys(state.whatsapp.answers).length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
          <h4 className="text-sm font-bold text-gray-700">Triagem WhatsApp</h4>
          <div className="space-y-2">
            {whatsappMessages
              .map((msg) => ({
                msg,
                answer: state.whatsapp.answers[msg.id],
              }))
              .filter(({ answer }) => answer && (answer.priority > 0 || answer.response))
              .sort((a, b) => (a.answer?.priority || 99) - (b.answer?.priority || 99))
              .map(({ msg, answer }) => (
                <div key={msg.id} className="border-b border-gray-100 pb-2 last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-primary">#{answer.priority}</span>
                    <span className="text-xs text-gray-500">{msg.id}. {msg.sender}</span>
                  </div>
                  {answer.response && (
                    <p className="text-xs text-gray-600 mt-0.5 pl-6">{answer.response}</p>
                  )}
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Perfil - respostas individuais */}
      {Object.keys(state.perfil).length > 0 && (
        <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
          <h4 className="text-sm font-bold text-gray-700">Respostas do Perfil Psicológico</h4>
          {perfilQuestions.map((q, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs">
              <span className="font-bold text-gray-500 w-4 flex-shrink-0">{idx + 1}.</span>
              <span className="text-gray-600 flex-1">{q}</span>
              <span className="font-bold text-primary">{state.perfil[idx] || "—"}</span>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4 no-print">
        <button
          type="button"
          onClick={() => window.print()}
          className="flex-1 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors cursor-pointer"
        >
          Imprimir / Salvar PDF
        </button>
        <button
          type="button"
          onClick={onReset}
          className="rounded-lg border border-gray-300 px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          Nova avaliação
        </button>
      </div>
    </div>
  );
}

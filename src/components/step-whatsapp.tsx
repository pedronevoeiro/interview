"use client";

import { whatsappMessages } from "@/lib/questions";
import type { WhatsAppTest } from "@/lib/types";

interface Props {
  data: WhatsAppTest;
  onChange: (data: WhatsAppTest) => void;
}

export function StepWhatsApp({ data, onChange }: Props) {
  const updatePriority = (id: string, priority: number) => {
    const current = data.answers[id] || { priority: 0, response: "" };
    onChange({
      answers: { ...data.answers, [id]: { ...current, priority } },
    });
  };

  const updateResponse = (id: string, response: string) => {
    const current = data.answers[id] || { priority: 0, response: "" };
    onChange({
      answers: { ...data.answers, [id]: { ...current, response } },
    });
  };

  const usedPriorities = new Set(
    Object.values(data.answers)
      .map((a) => a.priority)
      .filter((p) => p > 0)
  );

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
        Passe o dispositivo para o <strong>candidato</strong>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4 space-y-2">
        <p className="text-sm text-gray-800 leading-relaxed">
          São 08:00 da manhã. Você acabou de abrir o WhatsApp da empresa e tem 10 mensagens
          acumuladas de ontem à noite e hoje cedo. Sua tarefa é:
        </p>
        <ol className="text-sm text-gray-700 list-decimal list-inside space-y-1">
          <li>
            <strong>Numerar de 1 a 10</strong> a ordem em que você responderia cada uma
            (1 = Primeiro / 10 = Último).
          </li>
          <li>
            <strong>Escrever uma resposta curta</strong> (estilo WhatsApp) para cada uma delas.
          </li>
        </ol>
      </div>

      <div className="space-y-4">
        {whatsappMessages.map((msg) => {
          const answer = data.answers[msg.id];
          const currentPriority = answer?.priority || 0;

          return (
            <div
              key={msg.id}
              className="rounded-lg border border-gray-200 bg-white p-4 space-y-3"
            >
              {/* Message header */}
              <div className="flex items-start gap-3">
                <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-600">
                  {msg.id}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-500">{msg.sender}</p>
                  <p className="text-sm text-gray-800 mt-0.5">{msg.text}</p>
                </div>
              </div>

              {/* Priority selector */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1.5">
                  Ordem de resposta:
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {Array.from({ length: whatsappMessages.length }, (_, i) => i + 1).map((n) => {
                    const isSelected = currentPriority === n;
                    const isUsedElsewhere = usedPriorities.has(n) && !isSelected;

                    return (
                      <button
                        key={n}
                        type="button"
                        onClick={() => updatePriority(msg.id, isSelected ? 0 : n)}
                        className={`w-9 h-9 rounded-lg border-2 text-sm font-bold transition-all cursor-pointer ${
                          isSelected
                            ? "border-primary bg-primary text-white"
                            : isUsedElsewhere
                            ? "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed"
                            : "border-gray-200 bg-white hover:border-primary-light text-gray-600"
                        }`}
                        disabled={isUsedElsewhere}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Response textarea */}
              <div>
                <label className="block text-xs font-medium text-gray-500 mb-1">
                  Sua resposta:
                </label>
                <textarea
                  value={answer?.response || ""}
                  onChange={(e) => updateResponse(msg.id, e.target.value)}
                  rows={2}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-y"
                  placeholder="Escreva como responderia no WhatsApp..."
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Progress */}
      <div className="rounded-lg bg-gray-50 border border-gray-200 p-3 text-center">
        <p className="text-sm text-gray-500">
          {usedPriorities.size} de {whatsappMessages.length} mensagens priorizadas
        </p>
      </div>
    </div>
  );
}

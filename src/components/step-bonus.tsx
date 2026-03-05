"use client";

import { bonusPrompt } from "@/lib/questions";
import type { BonusQuestion } from "@/lib/types";

interface Props {
  data: BonusQuestion;
  onChange: (data: BonusQuestion) => void;
}

export function StepBonus({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
        Passe o dispositivo para o <strong>candidato</strong>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm font-medium text-gray-800">{bonusPrompt}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sua resposta
        </label>
        <textarea
          value={data.response}
          onChange={(e) => onChange({ ...data, response: e.target.value })}
          rows={6}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-y"
          placeholder="Escreva sua resposta aqui..."
        />
      </div>
    </div>
  );
}

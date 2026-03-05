"use client";

import { writingPrompt } from "@/lib/questions";
import type { WritingTest } from "@/lib/types";

interface Props {
  data: WritingTest;
  onChange: (data: WritingTest) => void;
}

export function StepEscrita({ data, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
        Passe o dispositivo para o <strong>candidato</strong>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-4">
        <p className="text-sm text-gray-800 leading-relaxed">{writingPrompt}</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Sua resposta
        </label>
        <textarea
          value={data.response}
          onChange={(e) => onChange({ ...data, response: e.target.value })}
          rows={8}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none resize-y"
          placeholder="Escreva sua mensagem aqui..."
        />
      </div>
    </div>
  );
}

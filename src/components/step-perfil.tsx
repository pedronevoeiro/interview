"use client";

import { perfilQuestions } from "@/lib/questions";
import { scoreProfile } from "@/lib/scoring";
import type { PerfilAnswers } from "@/lib/types";
import { LikertScale } from "./likert-scale";

interface Props {
  data: PerfilAnswers;
  onChange: (data: PerfilAnswers) => void;
}

export function StepPerfil({ data, onChange }: Props) {
  const answeredCount = Object.keys(data).length;
  const profile = answeredCount === 10 ? scoreProfile(data) : null;

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-800">
        Passe o dispositivo para o <strong>candidato</strong>
      </div>

      <p className="text-sm text-gray-600">
        Responda cada afirmação de 1 (discordo totalmente) a 5 (concordo totalmente).
      </p>

      <div className="space-y-6">
        {perfilQuestions.map((question, idx) => (
          <div key={idx} className="rounded-lg border border-gray-200 bg-white p-4 space-y-3">
            <p className="text-sm font-medium text-gray-800">
              {idx + 1}. {question}
            </p>
            <LikertScale
              name={`q${idx}`}
              value={data[idx]}
              onChange={(val) => onChange({ ...data, [idx]: val })}
            />
          </div>
        ))}
      </div>

      {profile && (
        <div className="rounded-lg bg-gray-50 border border-gray-200 p-4 text-center">
          <p className="text-sm text-gray-500">Pontuação bruta</p>
          <p className="text-3xl font-bold text-gray-800">{profile.raw}/50</p>
          <p className="text-sm font-medium mt-1" style={{
            color: profile.raw >= 35 ? "#10b981" : profile.raw >= 30 ? "#f59e0b" : "#ef4444"
          }}>
            {profile.label}
          </p>
        </div>
      )}
    </div>
  );
}

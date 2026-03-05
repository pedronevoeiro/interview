"use client";

import { strongSigns, redFlags } from "@/lib/questions";
import type { Observations } from "@/lib/types";

interface Props {
  data: Observations;
  onChange: (data: Observations) => void;
}

export function StepObservacoes({ data, onChange }: Props) {
  const toggleStrong = (sign: string) => {
    const list = data.strongSigns.includes(sign)
      ? data.strongSigns.filter((s) => s !== sign)
      : [...data.strongSigns, sign];
    onChange({ ...data, strongSigns: list });
  };

  const toggleRed = (flag: string) => {
    const list = data.redFlags.includes(flag)
      ? data.redFlags.filter((f) => f !== flag)
      : [...data.redFlags, flag];
    onChange({ ...data, redFlags: list });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-amber-50 border border-amber-200 px-4 py-3 text-sm text-amber-800">
        Preenchido pelo <strong>entrevistador</strong>
      </div>

      {/* Strong signs */}
      <div className="rounded-lg border border-emerald-200 bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-emerald-800">
          Sinais de vendedor forte
        </h3>
        <div className="space-y-2">
          {strongSigns.map((sign) => (
            <label
              key={sign}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-emerald-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={data.strongSigns.includes(sign)}
                onChange={() => toggleStrong(sign)}
                className="w-5 h-5 rounded border-gray-300 text-emerald-600 accent-emerald-600"
              />
              <span className="text-sm text-gray-700">{sign}</span>
            </label>
          ))}
        </div>
        <p className="text-xs text-gray-500">
          {data.strongSigns.length} de {strongSigns.length} sinais positivos
        </p>
      </div>

      {/* Red flags */}
      <div className="rounded-lg border border-red-200 bg-white p-4 space-y-3">
        <h3 className="text-sm font-bold text-red-800">Red flags</h3>
        <div className="space-y-2">
          {redFlags.map((flag) => (
            <label
              key={flag}
              className="flex items-center gap-3 cursor-pointer p-2 rounded-lg hover:bg-red-50 transition-colors"
            >
              <input
                type="checkbox"
                checked={data.redFlags.includes(flag)}
                onChange={() => toggleRed(flag)}
                className="w-5 h-5 rounded border-gray-300 text-red-600 accent-red-600"
              />
              <span className="text-sm text-gray-700">{flag}</span>
            </label>
          ))}
        </div>
        {data.redFlags.length > 0 && (
          <p className="text-xs text-red-600 font-medium">
            {data.redFlags.length} red flag(s) identificada(s)
          </p>
        )}
      </div>
    </div>
  );
}

"use client";

import { likertLabels } from "@/lib/questions";

interface LikertScaleProps {
  value: number | undefined;
  onChange: (value: number) => void;
  name: string;
}

export function LikertScale({ value, onChange, name }: LikertScaleProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((n) => (
        <button
          key={n}
          type="button"
          onClick={() => onChange(n)}
          className={`flex flex-col items-center rounded-lg border-2 px-3 py-2 text-sm transition-all cursor-pointer min-w-[80px] ${
            value === n
              ? "border-primary bg-primary text-white"
              : "border-gray-200 bg-white hover:border-primary-light"
          }`}
          aria-label={`${name}: ${n} - ${likertLabels[n - 1]}`}
        >
          <span className="text-lg font-bold">{n}</span>
          <span className="text-[10px] leading-tight text-center">
            {likertLabels[n - 1]}
          </span>
        </button>
      ))}
    </div>
  );
}

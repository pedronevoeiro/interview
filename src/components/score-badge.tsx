interface ScoreBadgeProps {
  total: number;
  classification: string;
}

export function ScoreBadge({ total, classification }: ScoreBadgeProps) {
  let colorClass: string;
  if (total >= 85) colorClass = "bg-emerald-100 text-emerald-800 border-emerald-300";
  else if (total >= 70) colorClass = "bg-blue-100 text-blue-800 border-blue-300";
  else if (total >= 55) colorClass = "bg-amber-100 text-amber-800 border-amber-300";
  else colorClass = "bg-red-100 text-red-800 border-red-300";

  return (
    <div className={`inline-flex items-center gap-3 rounded-xl border-2 px-6 py-4 ${colorClass}`}>
      <span className="text-4xl font-bold">{total}</span>
      <div className="flex flex-col">
        <span className="text-sm font-medium">de 100 pontos</span>
        <span className="text-lg font-bold">{classification}</span>
      </div>
    </div>
  );
}

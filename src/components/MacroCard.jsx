import React from "react";
import Box from "./Box";
import { BAR_CLASS, fmtInt } from "../utils/helpers";

export default function MacroCard({
  title,
  pct,
  kcal,
  grams,
  perMeal,
  color = "green",
}) {
  const barClass = BAR_CLASS[color] || "bg-slate-600";
  return (
    <div className="rounded-2xl border border-slate-800 overflow-hidden bg-slate-900/60">
      <div className={`h-2 w-full ${barClass}`} />
      <div className="p-5">
        <div className="flex items-baseline justify-between">
          <h3 className="font-medium">{title}</h3>
          <span className="text-slate-400 text-sm">{fmtInt(pct)}%</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-center">
          <Box label="kcal" value={fmtInt(kcal)} />
          <Box label="กรัม/วัน" value={`${fmtInt(grams)}g`} />
          <Box label="กรัม/มื้อ" value={`${fmtInt(perMeal)}g`} />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import { clamp, BAR_CLASS, SLIDER_ACCENT, fmtInt } from "../utils/helpers";

export default function Gauge({
  label,
  value,
  onChange,
  color = "green",
  readOnly = false,
}) {
  const barClass = BAR_CLASS[color] || "bg-slate-600";
  const accent = SLIDER_ACCENT[color] || "accent-indigo-500";

  return (
    <div className="grid gap-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-slate-300">{label}</span>
        <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-800/60 px-3 py-1 text-sm font-medium">
          {fmtInt(value)}%
        </span>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        disabled={readOnly}
        onChange={(e) =>
          !readOnly && onChange(clamp(Number(e.target.value) || 0, 0, 100))
        }
        className={`w-full ${accent}`}
      />

      <div className="h-3 rounded-full border border-slate-800 bg-slate-950/60 overflow-hidden">
        <div
          className={`h-full ${barClass}`}
          style={{ width: `${clamp(value, 0, 100)}%` }}
        />
      </div>
    </div>
  );
}

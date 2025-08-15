import React from "react";
import { clamp } from "../utils/helpers";

export default function NumberInput({ value, onChange, min, max, step }) {
  return (
    <input
      className="w-full rounded-xl bg-slate-900/70 border border-slate-800 px-4 py-2 text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
      type="number"
      value={value}
      min={min}
      max={max}
      step={step}
      onChange={(e) =>
        onChange(
          clamp(Number(e.target.value) || 0, min ?? -Infinity, max ?? Infinity)
        )
      }
    />
  );
}

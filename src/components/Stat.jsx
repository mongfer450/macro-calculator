import React from "react";

export default function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-slate-800 p-4 bg-slate-900/60">
      <p className="text-slate-400 text-sm">{label}</p>
      <p className="text-2xl font-semibold">{value}</p>
    </div>
  );
}

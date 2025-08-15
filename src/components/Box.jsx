import React from "react";

export default function Box({ label, value }) {
  return (
    <div className="rounded-xl bg-slate-950/40 border border-slate-800 p-3">
      <p className="text-slate-400 text-xs">{label}</p>
      <p className="text-lg font-semibold whitespace-pre">{value}</p>
    </div>
  );
}

import React from "react";

export default function TabBtn({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-xl px-3 py-2 text-sm border transition ${
        active
          ? "bg-slate-800/80 border-slate-700 shadow-sm"
          : "bg-slate-900/60 border-slate-800 hover:bg-slate-800/60"
      }`}
    >
      {children}
    </button>
  );
}

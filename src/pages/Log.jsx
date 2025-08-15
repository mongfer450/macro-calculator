import React from "react";
import { fmtInt, formatTs } from "../utils/helpers";

export default function Log({ items, onClear, onRemove }) {
  return (
    <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <h2 className="font-medium">รายการ</h2>
        <button
          className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 hover:bg-slate-700/80 transition"
          onClick={onClear}
        >
          ลบทั้งหมด
        </button>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-400 mt-4">ยังไม่มีบันทึก</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-slate-300">
              <tr className="border-b border-slate-800">
                <th className="py-2 text-left">เวลา</th>
                <th className="py-2 text-left">TDEE</th>
                <th className="py-2 text-left">% (C/P/F)</th>
                <th className="py-2 text-left">กรัม/วัน (C/P/F)</th>
                <th className="py-2 text-left">ต่อมื้อ (C/P/F)</th>
                <th className="py-2 text-left">มื้อ/วัน</th>
                <th className="py-2 text-left">การทำงาน</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it) => (
                <tr
                  key={it.id}
                  className="border-b border-slate-900/70 hover:bg-slate-900/40"
                >
                  <td className="py-2 pr-3 whitespace-nowrap">
                    {formatTs(it.ts)}
                  </td>
                  <td className="py-2 pr-3">{fmtInt(it.tdee)}</td>
                  <td className="py-2 pr-3">{`${fmtInt(it.pct.c)} / ${fmtInt(
                    it.pct.p
                  )} / ${fmtInt(it.pct.f)}`}</td>
                  <td className="py-2 pr-3">{`${fmtInt(it.grams.c)}g / ${fmtInt(
                    it.grams.p
                  )}g / ${fmtInt(it.grams.f)}g`}</td>
                  <td className="py-2 pr-3">{`${fmtInt(
                    it.perMeal.c
                  )}g / ${fmtInt(it.perMeal.p)}g / ${fmtInt(
                    it.perMeal.f
                  )}g`}</td>
                  <td className="py-2 pr-3">{it.meals}</td>
                  <td className="py-2 flex gap-2">
                    <button
                      className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 hover:bg-slate-700/80 transition"
                      onClick={() => onRemove(it.id)}
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

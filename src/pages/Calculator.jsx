import React, { useMemo, useState } from "react";
import Field from "../components/Field";
import NumberInput from "../components/NumberInput";
import Gauge from "../components/Gauge";
import MacroCard from "../components/MacroCard";
import Stat from "../components/Stat";
import { clamp, clampPct, fmtInt } from "../utils/helpers";

export default function Calculator({ onSave }) {
  const [tdee, setTdee] = useState(2200);
  const [meals, setMeals] = useState(3);
  const [carbPct, setCarbPct] = useState(40);
  const [proteinPct, setProteinPct] = useState(30);
  const fatPct = useMemo(
    () => clampPct(100 - carbPct - proteinPct),
    [carbPct, proteinPct]
  );

  const kcal = useMemo(
    () => ({
      c: (tdee * carbPct) / 100,
      p: (tdee * proteinPct) / 100,
      f: (tdee * fatPct) / 100,
    }),
    [tdee, carbPct, proteinPct, fatPct]
  );

  const grams = useMemo(
    () => ({ c: kcal.c / 4, p: kcal.p / 4, f: kcal.f / 9 }),
    [kcal]
  );
  const perMeal = useMemo(
    () => ({
      c: grams.c / Math.max(1, meals),
      p: grams.p / Math.max(1, meals),
      f: grams.f / Math.max(1, meals),
    }),
    [grams, meals]
  );

  const invalid = fatPct < 0 || carbPct + proteinPct + fatPct !== 100;

  const save = () => {
    if (tdee <= 0 || invalid) return;
    onSave({
      tdee,
      meals,
      pct: { c: carbPct, p: proteinPct, f: fatPct },
      grams: { c: grams.c, p: grams.p, f: grams.f },
      perMeal: { c: perMeal.c, p: perMeal.p, f: perMeal.f },
    });
  };

  return (
    <div className="grid lg:grid-cols-1 gap-5">
      {/* Controls */}
      <section className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h2 className="font-medium mb-4">คำนวณสารอาหาร</h2>
        <div className="grid grid-cols-2 gap-3">
          <Field label="TDEE (kcal/วัน)">
            <NumberInput value={tdee} min={0} step={10} onChange={setTdee} />
          </Field>
          <Field label="มื้อ/วัน">
            <NumberInput
              value={meals}
              min={1}
              max={12}
              step={1}
              onChange={(v) => setMeals(clamp(v, 1, 12))}
            />
          </Field>
        </div>

        <div className="mt-4 grid gap-4">
          <Gauge
            label="Carbs (%)"
            value={carbPct}
            onChange={setCarbPct}
            color="green"
          />
          <Gauge
            label="Proteins (%)"
            value={proteinPct}
            onChange={setProteinPct}
            color="red"
          />
          <Gauge
            label="Fats (%) — คำนวณอัตโนมัติ"
            value={fatPct}
            readOnly
            color="yellow"
          />
        </div>

        <p className="text-sm text-slate-400 mt-3">
          C {fmtInt(carbPct)}% + P {fmtInt(proteinPct)}% + F {fmtInt(fatPct)}%
          {invalid && <span className="text-amber-400"> — ต้องรวม = 100%</span>}
        </p>

        <div className="mt-4">
          <button
            onClick={save}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-slate-100 hover:bg-slate-700/80 transition"
          >
            บันทึก
          </button>
        </div>
      </section>

      {/* Results */}
      <section className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900/60 p-5">
        <h3 className="font-medium mb-3">ผลลัพธ์ (เลขจำนวนเต็ม)</h3>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          <Stat label="Total cals" value={`${fmtInt(tdee)} kcal`} />
          <Stat label="มื้อ/วัน" value={`${fmtInt(meals)}`} />
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <MacroCard
            title="Carbs"
            pct={carbPct}
            kcal={kcal.c}
            grams={grams.c}
            perMeal={perMeal.c}
            color="green"
          />
          <MacroCard
            title="Proteins"
            pct={proteinPct}
            kcal={kcal.p}
            grams={grams.p}
            perMeal={perMeal.p}
            color="red"
          />
          <MacroCard
            title="Fats"
            pct={fatPct}
            kcal={kcal.f}
            grams={grams.f}
            perMeal={perMeal.f}
            color="yellow"
          />
        </div>
      </section>
    </div>
  );
}

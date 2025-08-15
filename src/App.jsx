import React, { useEffect, useState } from "react";
import Calculator from "./pages/Calculator";
import Log from "./pages/Log";
import TabBtn from "./components/TabBtn";
import { cryptoRandomId } from "./utils/helpers";

export default function App() {
  const TABS = { CALC: "calc", LOG: "log" };
  const [tab, setTab] = useState(TABS.CALC);

  // บันทึก (LocalStorage)
  const LS_KEY = "macro_log_v1";
  const [items, setItems] = useState([]);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const handleSave = ({ tdee, meals, pct, grams, perMeal }) => {
    const entry = {
      id: cryptoRandomId(),
      ts: Date.now(),
      tdee,
      meals,
      pct,
      grams,
      perMeal,
    };
    setItems((prev) => [entry, ...prev]);
    setTab(TABS.LOG);
  };

  const handleClear = () => {
    if (confirm("ลบบันทึกทั้งหมด?")) setItems([]);
  };
  const handleRemove = (id) =>
    setItems((prev) => prev.filter((x) => x.id !== id));

  return (
    <div className="min-h-screen min-w-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-5xl px-4 py-8">
        <header className="mb-5 flex items-center justify-between gap-2 flex-wrap">
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
            Macro caculator
          </h1>
          <nav className="flex gap-2">
            <TabBtn
              active={tab === TABS.CALC}
              onClick={() => setTab(TABS.CALC)}
            >
              Calculator
            </TabBtn>
            <TabBtn active={tab === TABS.LOG} onClick={() => setTab(TABS.LOG)}>
              Macro-notes
            </TabBtn>
          </nav>
        </header>

        {tab === TABS.CALC ? (
          <Calculator onSave={handleSave} />
        ) : (
          <Log items={items} onClear={handleClear} onRemove={handleRemove} />
        )}
      </div>
    </div>
  );
}

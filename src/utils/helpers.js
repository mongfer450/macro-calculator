// Utilities แบบคงที่ (ไม่มี TS) และไม่มี Tailwind dynamic
export const clamp = (n, min, max) => Math.max(min, Math.min(max, n));
export const fmtInt = (n) => Math.round(Number(n) || 0);
export const clampPct = (n) => {
    const x = Number.isFinite(n) ? n : 0;
    return Math.max(0, Math.min(100, Math.round(x)));
};
export const formatTs = (ts) => {
    try { return new Date(ts).toLocaleString("th-TH", { hour12: false }); }
    catch { return String(new Date(ts)); }
};
export const cryptoRandomId = () =>
    (typeof crypto !== "undefined" && crypto.randomUUID)
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2);

// สีคงที่สำหรับเกจ/การ์ด (ไม่มี class แบบ template string)
export const BAR_CLASS = {
    green: "bg-green-600",
    red: "bg-red-600",
    yellow: "bg-yellow-500",
};
export const SLIDER_ACCENT = {
    green: "accent-green-600",
    red: "accent-red-600",
    yellow: "accent-yellow-500",
};

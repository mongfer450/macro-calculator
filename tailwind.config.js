/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
    theme: { extend: {} },
    plugins: [],
    // สำคัญ: ใช้คลาสสีแบบ dynamic อยู่ (bg-green-600/bg-red-600/bg-yellow-500)
    safelist: ["bg-green-600", "bg-red-600", "bg-yellow-500", "accent-green-600", "accent-red-600", "accent-yellow-500"],
}

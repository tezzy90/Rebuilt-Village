/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "./*.{js,ts,jsx,tsx}",
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: '#0d9488', // Teal 600
                secondary: '#f97316', // Orange 500
                dark: '#0f172a', // Slate 900
                paper: '#f1f5f9', // Slate 100
                'film-black': '#020617', // Very dark slate
            },
            fontFamily: {
                sans: ['Inter', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
                mono: ['"Courier Prime"', 'Courier New', 'monospace'],
            },
        },
    },
    plugins: [],
}

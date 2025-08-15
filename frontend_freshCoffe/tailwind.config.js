/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                borel: ['"Borel"', "cursive"],
                fjalla: ['"Fjalla One"', "sans-serif"],
                lobster: ['"Lobster Two"', "cursive"],
                michroma: ['"Michroma"', "sans-serif"],
                orbitron: ['"Orbitron"', "sans-serif"],
            },
        },
    },
    plugins: [],
}


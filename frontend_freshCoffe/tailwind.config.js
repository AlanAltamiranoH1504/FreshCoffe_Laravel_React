/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}"
    ],
    theme: {
        extend: {
            fontFamily: {
                fjalla: ['"Fjalla One"', "sans-serif"]
            },
        },
    },
    plugins: [],
}


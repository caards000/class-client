/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js,ts,tsx,jsx}"],
    theme: {
        fontFamily: {
            sans: ["Inter", "sans-serif"]
        },
        extend: {
            colors: {
                primary: {
                    "4": "rgba(51,53,216,0.04)",
                    "8": "rgba(51,53,216,0.08)",
                    "12": "rgba(51,53,216,0.12)",
                    "16": "rgba(51,53,216,0.16)",
                    "24": "rgba(51,53,216,0.24)",
                    "32": "rgba(51,53,216,0.32)",
                    "56": "rgba(51,53,216,0.56)",
                    light: "#6061E1",
                    normal: "#3335d8",
                    dark: "#2224B3"
                }
            }
        },
    },
    plugins: [],
    important: true,
}


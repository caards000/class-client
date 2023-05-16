/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{html,js}"],
    theme: {
        extend: {
            colors: {
                primary: {
                  light: "#6061E1",
                  normal: "#3335d8",
                  dark: "#2224B3"
                }
            }
        },
    },
    plugins: [],
}


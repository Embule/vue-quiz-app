/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // fontFamily: {
      //   sans: ["Poppins", "ui-sans-serif", "system-ui"],
      // },
      animation: {
        correct: "correctFlash 0.5s ease-out",
        incorrect: "incorrectFlash 0.5s ease-out",
      },
      keyframes: {
        correctFlash: {
          "0%": { backgroundColor: "#22c55e", transform: "scale(1)" },
          "50%": { backgroundColor: "#16a34a", transform: "scale(1.05)" },
          "100%": { backgroundColor: "#22c55e", transform: "scale(1)" },
        },
        incorrectFlash: {
          "0%": { backgroundColor: "#ef4444", transform: "scale(1)" },
          "50%": { backgroundColor: "#dc2626", transform: "scale(1.05)" },
          "100%": { backgroundColor: "#ef4444", transform: "scale(1)" },
        },
      },
    },
  },
  plugins: [],
};

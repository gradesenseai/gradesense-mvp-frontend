/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./pages/**/*.{js,jsx}", "./components/**/*.{js,jsx}", "./app/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#00C774",
          black: "#000000",
          white: "#FFFFFF",
          grayLight: "#EDEDED",
          grayDark: "#4B4B4B"
        }
      },
      fontFamily: {
        inter: ["Inter", "system-ui", "Arial"]
      },
      borderRadius: {
        xl2: "1rem",
        xl3: "1.25rem"
      },
      boxShadow: {
        soft: "0 6px 24px rgba(0,0,0,0.08)"
      }
    }
  },
  plugins: []
};
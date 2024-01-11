/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 90s linear",
        ping: "ping 30s ",
      },
      colors: {
        primary: "#134462",
        text: "#08151E",
        secondary: "#55738D",
        dimWhite: "#FAFAFA",
        hover: "#3F7EA5",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        orangePrimary: "#ffb236",
        bluePrimary: "#134462",
        accent: "#F49D14",
        accent1: "#69b9ce",
        accent2: "#EBF5F8",
        blueSecondary: "#002333",
        blueLight: "#3f88b5",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "360px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1440px",
      xl: "1700px",
    },
  },
  plugins: [],
};

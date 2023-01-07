/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f5f4f5",
        grayShade: "#d3d6e7",
        secoundary: "#eff2fa",
        badge: "#fefffa",

        link: "#4481ce",
        secoundary_link: "rgba(255,255,255,255)",
        creamy: "#eeeeeded",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

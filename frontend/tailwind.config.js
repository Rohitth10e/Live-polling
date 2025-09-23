/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryPurple: "#7765DA",
        secondaryBlue: "#5767D0",
        accentViolet: "#4F0DCE",
        lightGray: "#F2F2F2",
        darkGray: "#373737",
        mediumGray: "#6E6E6E",
      },
      fontFamily: {
        lato: ['Lato', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        jakarta: ['"Plus Jakarta Sans"', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

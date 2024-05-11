const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./src/**/*.{js,jsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },

    extend: {
      screens: {
        xss: "320px",
        xs: "425px",
        lg2: "1440px",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      fontFamily: {
        archivo: ["var(--font-archivo)", ...fontFamily.sans],
        raleway: ["var(--font-raleway)", ...fontFamily.sans],
      },
      fontSize: {
        heading: `clamp(2.75rem, 3vw + 1rem, 3.5rem)`,
        heading_sm: `clamp(2.25rem, 5vw + 1rem, 2.75rem)`,
        heading2: `clamp(1.75rem, 1vw + 1rem, 2rem)`,
        heading2_sm: `clamp(1.5rem, 2vw + 1rem, 1.75rem)`,
        heading3: `clamp(2.25rem, 2vw + 1rem, 2.75rem)`,
        heading3_sm: `clamp(1.75rem, 3vw + 1rem, 2.25rem)`,

        body1: `clamp(0.875rem, 1vw + 0.5rem, 1rem);;`,
        body1_sm: `clamp(0.875rem, 1vw + 1rem, 1.25rem);`,
      },
    },
  },
  plugins: [
    require("tailwindcss-animate", require("@tailwindcss/typography")),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};

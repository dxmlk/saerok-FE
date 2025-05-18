/** @type {import('tailwindcss').Config} */

const createPxEntries = (size: number) => {
  return {
    0: "0",
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${(i * 4) / 10}rem` };
    }),
  };
};

const PX_ENTRIES = createPxEntries(500);

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/**/*.js"],
  theme: {
    extend: {
      spacing: PX_ENTRIES,
      fontWeight: {
        400: "400",
        500: "500",
        600: "600",
        700: "700",
        800: "800",
      },
      fontFamily: {
        pretendard: ["'Pretendard Variable'", "sans-serif"],
        moneygraphy: ["'Moneygraphy'", "sans-serif"],
      },
      fontSize: {
        "subtitle-3": ["1.8rem", { lineHeight: "2.2rem", letterSpacing: "0", fontWeight: "400" }],
        "body-0": ["1.6rem", { lineHeight: "1.9rem", letterSpacing: "0", fontWeight: "700" }],
        "body-1": ["1.5rem", { lineHeight: "1.8rem", letterSpacing: "0", fontWeight: "600" }],
        "body-2": ["1.5rem", { lineHeight: "1.8rem", letterSpacing: "0", fontWeight: "400" }],
        "body-4": ["1.5rem", { lineHeight: "2.5rem", letterSpacing: "0", fontWeight: "400" }],
        "cation-1": ["1.3rem", { lineHeight: "1.6rem", letterSpacing: "0", fontWeight: "400" }],
        "caption-3": ["1.2rem", { lineHeight: "1.4rem", letterSpacing: "0", fontWeight: "400" }],
        "button-1": ["1.8rem", { lineHeight: "2.1rem", letterSpacing: "0", fontWeight: "700" }],
        "button-2": ["1.5rem", { lineHeight: "1.8rem", letterSpacing: "0", fontWeight: "400" }],
        "headline-1": ["3.0rem", { lineHeight: "3.3rem", letterSpacing: "0" }],
        "headline-2": ["2.2rem", { lineHeight: "3.3rem", letterSpacing: "0" }],
        "subtitle-1": ["2.0rem", { lineHeight: "2.2rem", letterSpacing: "0" }],
        "subtitle-2": ["1.8rem", { lineHeight: "2.0rem", letterSpacing: "0" }],
        "body-3": ["1.5rem", { lineHeight: "1.8rem", letterSpacing: "0" }],
        "caption-2": ["1.3rem", { lineHeight: "1.6rem", letterSpacing: "0" }],
      },
      borderRadius: {
        none: "0px",
        4: "0.4rem",
        8: "0.8rem",
        10: "1rem",
        12: "1.2rem",
        16: "1.6rem",
        24: "2.4rem",
        full: "9999px",
      },
      zIndex: {
        base: "1",
        nav: "2",
        popup: "999",
        floating: "1000",
      },
      colors: {
        transparent: "transparent",
        white: "#FFF",
        black: "#000",
        saerokGreen: "#51BEA6",
        deletedRed: "#D90000",
        completeGreen: "#008589",
        beolsaeBrown: "#EC7B32",
        background: {
          white: "#FEFEFE",
          whitegray: "#F2F2F2",
        },
        font: {
          whitegrayLight: "#D9D9D9",
          whitegrayDark: "#979797",
          darkgray: "#6D6D6D",
          black: "0D0D0D",
        },
      },
    },
    plugins: [],
  },
};

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
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        green: "#51BEA6",
      },
    },
    plugins: [],
  },
};

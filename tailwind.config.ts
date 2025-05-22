/** @type {import('tailwindcss').Config} */

const createPxEntries = (size: number) => {
  return {
    0: "0px",
    ...Array.from(Array(size + 1)).reduce((accumulator, _, i) => {
      return { ...accumulator, [`${i * 4}`]: `${i * 4}px` };
    }),
  };
};

const PX_ENTRIES = {
  ...createPxEntries(500),
  5: "5px",
  10: "10px",
  14: "14px",
  15: "15px",
  17: "17px",
  22: "22px",
  50: "50px",
  54: "54px",
};

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", "./node_modules/react-tailwindcss-datepicker/dist/**/*.js"],
  theme: {
    extend: {
      spacing: PX_ENTRIES,
      width: PX_ENTRIES,
      height: PX_ENTRIES,
      maxWidth: PX_ENTRIES,
      maxHeight: PX_ENTRIES,
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
        ...PX_ENTRIES,
        "subtitle-3": ["18px", { lineHeight: "22px", letterSpacing: "0", fontWeight: "400" }],
        "body-0": ["16px", { lineHeight: "19px", letterSpacing: "0", fontWeight: "700" }],
        "body-1": ["15px", { lineHeight: "18px", letterSpacing: "0", fontWeight: "500" }],
        "body-2": ["15px", { lineHeight: "18px", letterSpacing: "0", fontWeight: "400" }],
        "body-4": ["15px", { lineHeight: "25px", letterSpacing: "0", fontWeight: "400" }],
        "caption-1": ["13px", { lineHeight: "16px", letterSpacing: "0", fontWeight: "400" }],
        "caption-3": ["12px", { lineHeight: "14px", letterSpacing: "0", fontWeight: "400" }],
        "button-1": ["18px", { lineHeight: "21px", letterSpacing: "0", fontWeight: "700" }],
        "button-2": ["15px", { lineHeight: "18px", letterSpacing: "0", fontWeight: "400" }],
        "headline-1": ["30px", { lineHeight: "33px", letterSpacing: "0" }],
        "headline-2": ["22px", { lineHeight: "33px", letterSpacing: "0" }],
        "subtitle-1": ["20px", { lineHeight: "22px", letterSpacing: "0" }],
        "subtitle-2": ["18px", { lineHeight: "20px", letterSpacing: "0" }],
        "body-3": ["15px", { lineHeight: "18px", letterSpacing: "0" }],
        "caption-2": ["13px", { lineHeight: "16px", letterSpacing: "0" }],
      },
      borderWidth: {
        2: "2px",
      },
      borderRadius: {
        none: "0px",
        10: "10px",
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
        glassmorphism: "rgba(254, 254, 254, 0.6)",
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

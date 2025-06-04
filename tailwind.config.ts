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
  1: "1px",
  5: "5px",
  6: "6px",
  7: "7px",
  9: "9px",
  10: "10px",
  11: "11px",
  13: "13px",
  14: "14px",
  15: "15px",
  17: "17px",
  18: "18px",
  21: "21px",
  22: "22px",
  26: "26px",
  30: "30px",
  33: "33px",
  47: "47px",
  50: "50px",
  54: "54px",
  61: "61px",
  78: "78px",
  83: "83px",
  89: "89px",
  142: "142px",
  170: "170px",
  198: "198px",
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
        "caption-0": ["13px", { lineHeight: "16px", letterSpacing: "0", fontWeight: "700" }],
      },
      borderWidth: {
        1.5: "1.5px",
        2: "2px",
      },
      borderRadius: {
        none: "0px",
        4: "4px",
        10: "10px",
        20: "20px",
        30.5: "30.5px",
        100: "100px",
        full: "9999px",
      },
      zIndex: {
        base: "1",
        nav: "2",
        popup: "999",
        floating: "1000",
      },
      backgroundImage: {
        "custom-gradient": "linear-gradient(to bottom, #F9E2BE 5%, #FFFFFF 49%, #CDDDF3 91%)",
      },
      colors: {
        mainBlue: "#91BFFF",
        mainBlueLight: "#CDDDF3",
        pointYellow: "#F9E2BE",
        transparent: "transparent",
        white: "#FFF",
        black: "#000",
        saerokGreen: "#51BEA6",
        red: "#D90000",
        confirmBlue: "#002FCB",
        completeGreen: "#008589",
        beolsaeBrown: "#EC7B32",
        glassmorphism: "rgba(254, 254, 254, 0.6)",
        background: {
          white: "#FEFEFE",
          whitegray: "#F2F2F2",
        },
        font: {
          mainBlue: "#4190FF",
          pointYellow: "#F7BE65",
          whitegray: "#DAE0DE",
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

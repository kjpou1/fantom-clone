/* eslint-disable no-undef */
const colors = require("tailwindcss/colors"); // eslint-disable-line @typescript-eslint/no-var-requires
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "976px",
      xl: "1440px",
    },
    fontFamily: {
      sans: ["Work Sans", ...defaultTheme.fontFamily.sans],
      "sans-serif": ["Roboto", ...defaultTheme.fontFamily.sans],
      Roboto: ["Roboto", ...defaultTheme.fontFamily.sans],
      serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
      Merriweather: ["Merriweather", "serif"],
      drawer_menu: [
        "var(--f-drawer-menu-font-family)",
        ...defaultTheme.fontFamily.sans,
      ],
      tabs: ["var(--f-tabs-font-family)", ...defaultTheme.fontFamily.sans],
    },
    extend: {
      colors: {
        light_primary: "#fbfcff",
        dark_primary: "#2c2e3f",
        light_secondary: "#fbfcff",
        dark_secondary: "#222431",
        light_terciary: "#fbfcff",
        dark_terciary: "#33364a",
        light_btn: "#1969ff",
        dark_btn: "#1969ff",
        light_btn_hover: "#cdf",
        dark_btn_hover: "#3e425b",
        modal: "#202539",
        light_header: "#000",
        dark_header: "#fff",
        wallet_menu: "#286ff6",
        wallet_menu_dark: "#2c2e3f",
        wallet_link: "#a0bffd",
        wallet_link_active: colors.white,
        wallet_link_hover: colors.white,
        light_wallet_list: "#eee",
        light_wallet_list_hover: "#cdf",
        dark_wallet_list: "#33364a",
        dark_wallet_list_hover: "#3e425b",
        light_button: "#1969ff",
        light_button_hover: "#cdf",
        light_button_text: "#fff",
        neutral_text: "#9299a6",
        light_tab_hover: "#286ff6",
        light_tab_border: "#286ff6",
      },
    },
  },
  variants: {
    textColor: ["responsive", "hover", "focus", "group-hover"],
    extend: {},
  },
  plugins: [require("@formkit/tailwindcss").default],
};

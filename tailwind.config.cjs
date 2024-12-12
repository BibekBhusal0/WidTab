const mainPaletteColors = ["main", "light", "dark", "contrastText"];
const backgroundPaletteColors = ["default", "paper"];

const muiPaletteColors = {
  primary: mainPaletteColors,
  transparentPrimary: mainPaletteColors,
  secondary: mainPaletteColors,
  error: mainPaletteColors,
  info: mainPaletteColors,
  success: mainPaletteColors,
  warning: mainPaletteColors,
  background: backgroundPaletteColors,
  primaryContainer: backgroundPaletteColors,
  secondaryContainer: backgroundPaletteColors,
  tertiaryContainer: backgroundPaletteColors,
};

const generateOpacityMapping = (colorName) => {
  const opacityMapping = {};
  for (let i = 1; i <= 9; i++) {
    opacityMapping[`${colorName}-${i}`] = `var(--${colorName}-${i})`;
  }
  return opacityMapping;
};

const generateColorMapping = () => {
  const colorMapping = {};
  Object.entries(muiPaletteColors).forEach(([key, subKeys]) => {
    subKeys.forEach((subKey) => {
      colorMapping[`${key}-${subKey}`] = `var(--mui-palette-${key}-${subKey})`;
    });
  });
  return colorMapping;
};

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ...generateColorMapping(),
        ...generateOpacityMapping("primary"),
        "text-primary": "var(--mui-palette-text-primary)",
        "text-secondary": "var(--mui-palette-text-secondary)",
        divider: "var(--mui-palette-divider)",
      },
      backdropBlur: {
        themed: "var(--custom-blur)",
        half: "calc(var(--custom-blur) / 2)",
      },
      blur: {
        themed: "var(--custom-blur)",
        half: "calc(var(--custom-blur) / 2)",
      },
      borderRadius: { themed: "var(--custom-border-radius)" },
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};

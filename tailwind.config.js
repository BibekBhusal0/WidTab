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
    opacityMapping[`${colorName}-${i}`] = `var(--${colorName}-opacity-${i})`;
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

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ...generateColorMapping(),
        ...generateOpacityMapping("primary"),
      },
    },
    backdropBlur: { themed: "var(--custom-blur)" },
    borderRadius: { themed: "var(--custom-border-radius)" },
  },
  darkMode: "class",
};

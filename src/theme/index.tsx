import { createTheme } from "@mui/material/styles";
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import type {} from "@mui/x-charts/themeAugmentation";
import { ThemeItemType } from "@/types/slice/theme";
import alphaColor from "@/utils/alpha";
import useCurrentTheme from "@/hooks/useCurrentTheme";

export const getTheme = ({
  mode,
  primaryColor,
  blur,
  roundness,
  opacity,
}: ThemeItemType) => {
  const primary = themeFromSourceColor(argbFromHex(primaryColor));
  const crrPrimary = primary.schemes[mode];

  const borderRadius = `${roundness * 30}px`;
  const b = `${blur * 10}px`;
  const backdropFilter = `blur(${b})`;
  const CSSv = document.documentElement.style;
  CSSv.setProperty("--custom-border-radius", borderRadius);
  CSSv.setProperty("--custom-blur", b);
  for (let i = 1; i <= 9; i++) {
    const opacityValue = i / 10;
    CSSv.setProperty(
      `--primary-${i}`,
      alphaColor(hexFromArgb(crrPrimary.primary), opacityValue)
    );
  }

  const rounded = {
    styleOverrides: {
      root: {
        borderRadius,
        backdropFilter,
      },
    },
  };

  return createTheme({
    cssVariables: true,
    palette: {
      mode,
      background: {
        default: hexFromArgb(crrPrimary.background),
        paper: alphaColor(hexFromArgb(crrPrimary.surface), opacity),
      },
      surfaceVariant: { main: hexFromArgb(crrPrimary.surfaceVariant) },
      primary: {
        main: hexFromArgb(crrPrimary.primary),
        contrastText: hexFromArgb(crrPrimary.onPrimary),
      },
      secondary: {
        main: hexFromArgb(crrPrimary.secondary),
        contrastText: hexFromArgb(crrPrimary.onSecondary),
      },
      text: {
        primary: hexFromArgb(crrPrimary.onBackground),
        secondary: hexFromArgb(crrPrimary.onSurface),
      },
      error: { main: hexFromArgb(crrPrimary.error) },

      transparentPrimary: {
        main: alphaColor(hexFromArgb(crrPrimary.primary), opacity),
        contrastText: hexFromArgb(crrPrimary.onPrimary),
        dark: alphaColor(hexFromArgb(crrPrimary.primary), opacity - 0.1),
        light: alphaColor(hexFromArgb(crrPrimary.primary), opacity + 0.1),
      },
      primaryContainer: {
        default: hexFromArgb(crrPrimary.primaryContainer),
        paper: alphaColor(hexFromArgb(crrPrimary.primaryContainer), opacity),
      },
      secondaryContainer: {
        default: hexFromArgb(crrPrimary.secondaryContainer),
        paper: alphaColor(hexFromArgb(crrPrimary.secondaryContainer), opacity),
      },
      tertiaryContainer: {
        default: hexFromArgb(crrPrimary.tertiaryContainer),
        paper: alphaColor(hexFromArgb(crrPrimary.tertiaryContainer), opacity),
      },
      action: { selectedOpacity: opacity / 1.5 },
      divider: hexFromArgb(crrPrimary.outline),
    },
    components: {
      MuiPaper: { ...rounded },
      MuiButton: { ...rounded },
      MuiTextField: { ...rounded },
      MuiInputBase: { ...rounded },
      MuiInput: { ...rounded },
      MuiFilledInput: { ...rounded },
      MuiOutlinedInput: { ...rounded },
      MuiBarChart: {
        defaultProps: {
          borderRadius: roundness * 30,
          colors: [hexFromArgb(crrPrimary.primary)],
          skipAnimation: false,
          tooltip: { trigger: "none" },
          axisHighlight: { x: "none", y: "none" },
        },
      },
    },
  });
};

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const th = useCurrentTheme();
  const theme = getTheme(th);
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

export default CustomThemeProvider;

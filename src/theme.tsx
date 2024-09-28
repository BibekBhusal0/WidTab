import { alpha, createTheme } from "@mui/material/styles";
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeItemType } from "./types/slice/theme";
import useCurrentTheme from "./hooks/useCurrentTheme";

export const getBorderRadius = (roundness: number) => `${roundness * 30}px`;

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
  const backdropFilter = `blur(${blur * 10}px)`;
  const rounded = {
    styleOverrides: {
      root: {
        borderRadius,
        backdropFilter,
      },
    },
  };

  return createTheme({
    palette: {
      mode,

      background: {
        default: hexFromArgb(crrPrimary.background),
        paper: alpha(hexFromArgb(crrPrimary.surface), opacity),
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
        main: alpha(hexFromArgb(crrPrimary.primary), opacity),
        contrastText: hexFromArgb(crrPrimary.onPrimary),
        dark: alpha(hexFromArgb(crrPrimary.primary), opacity - 0.1),
        light: alpha(hexFromArgb(crrPrimary.primary), opacity + 0.1),
      },
      primaryContainer: {
        default: hexFromArgb(crrPrimary.primaryContainer),
        paper: alpha(hexFromArgb(crrPrimary.primaryContainer), opacity),
      },
      secondaryContainer: {
        default: hexFromArgb(crrPrimary.secondaryContainer),
        paper: alpha(hexFromArgb(crrPrimary.secondaryContainer), opacity),
      },
      tertiaryContainer: {
        default: hexFromArgb(crrPrimary.tertiaryContainer),
        paper: alpha(hexFromArgb(crrPrimary.tertiaryContainer), opacity),
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
    },
  });
};

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const th = useCurrentTheme();
  const theme = getTheme(th);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;

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
      primaryContainer: {
        main: hexFromArgb(crrPrimary.primaryContainer),
      },
      transparentPrimary: {
        main: alpha(hexFromArgb(crrPrimary.primary), opacity),
        contrastText: hexFromArgb(crrPrimary.onPrimary),
        dark: alpha(hexFromArgb(crrPrimary.primary), opacity - 0.1),
        light: alpha(hexFromArgb(crrPrimary.primary), opacity + 0.1),
      },
      transparentPrimaryContainer: {
        main: alpha(hexFromArgb(crrPrimary.primaryContainer), opacity),
      },
      action: { selectedOpacity: opacity / 1.5 },
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

import { createTheme } from "@mui/material/styles";
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ThemeItemType } from "./types/slice/theme";
import useCurrentTheme from "./hooks/useCurrentTheme";

export const getTheme = ({
  mode,
  primaryColor,
  blur,
  roundness,
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
        paper: hexFromArgb(crrPrimary.surface),
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
      divider: hexFromArgb(crrPrimary.outline),
      success: {
        main: hexFromArgb(crrPrimary.primaryContainer),
        contrastText: hexFromArgb(crrPrimary.onPrimaryContainer),
      },
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

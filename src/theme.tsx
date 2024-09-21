import { createTheme } from "@mui/material/styles";
import { ThemeSliceType } from "./redux/slice/theme";
import { useSelector } from "react-redux";
import { StateType } from "./redux/store";
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import { CssBaseline, ThemeProvider } from "@mui/material";

export const getTheme = ({
  mode,
  primaryColor,
  blur,
  roundness,
}: ThemeSliceType) => {
  const primary = themeFromSourceColor(argbFromHex(primaryColor));
  const crrPrimary = primary.schemes[mode];

  const borderRadius = `${roundness * 30}px`;
  const backdropBlur = `blur(${blur * 10}px)`;

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
      error: {
        main: hexFromArgb(crrPrimary.error),
        contrastText: hexFromArgb(crrPrimary.onError),
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius,
            backdropBlur,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius,
          },
        },
      },
    },
  });
};

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const th = useSelector((state: StateType) => state.theme);
  const theme = getTheme(th);
  return (
    <ThemeProvider theme={theme}>
      <div className="bg-opacity"></div>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;

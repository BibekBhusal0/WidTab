import { createTheme } from "@mui/material/styles";
import {
  argbFromHex,
  themeFromSourceColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import { ThemeItemType } from "@/types/slice/theme";
import alphaColor from "@/utils/alpha";
import useCurrentTheme from "@/hooks/useCurrentTheme";
import { ReactNode } from "react";
import { cn } from "@/utils/cn";

type themeBackgroundProps = { children: ReactNode } & ThemeItemType;
function ThemeBackground({
  image,
  opacity,
  mode,
  children,
}: themeBackgroundProps) {
  const color =
    mode === "dark"
      ? `rgba(0,0,0,${opacity / 3})`
      : `rgba(255,255,255,${opacity / 3})`;
  const full = "size-full h-screen";
  return (
    <div
      className={cn(full, image && "bg-cover bg-center bg-no-repeat")}
      style={image ? { backgroundImage: `url(${image})` } : {}}>
      <div
        className={cn(full, image && "backdrop-blur-half")}
        style={image ? { backgroundColor: color } : {}}>
        {children}
      </div>
    </div>
  );
}

export const getTheme = (theme: ThemeItemType) => {
  const { mode, primaryColor, blur, roundness, opacity } = theme;
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
    },
  });
};

function CustomThemeProvider({ children }: { children: React.ReactNode }) {
  const th = useCurrentTheme();
  const theme = getTheme(th);
  //   setThemeBackground(th);
  return (
    <ThemeProvider theme={theme}>
      <ThemeBackground {...th} children={children} />

      {/* {children}
    </ThemeBackground> */}
    </ThemeProvider>
  );
}

export default CustomThemeProvider;

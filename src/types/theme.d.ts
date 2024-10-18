import { Palette, PaletteOptions } from "@mui/material/types";

declare module "@mui/material/styles" {
  interface Palette {
    primaryContainer: Palette["background"];
    secondaryContainer: Palette["background"];
    tertiaryContainer: Palette["background"];
    transparentPrimary: Palette["primary"];
    surfaceVariant: Palette["primary"];
  }

  interface PaletteOptions {
    surfaceVariant?: PaletteOptions["primary"];
    primaryContainer?: PaletteOptions["background"];
    secondaryContainer?: PaletteOptions["background"];
    tertiaryContainer?: PaletteOptions["background"];
    transparentPrimary?: PaletteOptions["primary"];
  }
}

declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    primaryContainer: true;
    transparentPrimaryContainer: true;
    transparentPrimary: true;
  }
}

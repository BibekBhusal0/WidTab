import { Palette, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    primaryContainer: Palette["primary"];
    transparentPrimaryContainer: Palette["primary"];
    transparentSecondaryContainer: Palette["primary"];
    secondaryContainer: Palette["primary"];
    tertiaryContainer: Palette["primary"];
    transparentTertiaryContainer: Palette["primary"];
    transparentPrimary: Palette["primary"];
    surfaceVariant: Palette["primary"];
  }

  interface PaletteOptions {
    surfaceVariant?: PaletteOptions["primary"];
    primaryContainer?: PaletteOptions["primary"];
    transparentSecondaryContainer?: PaletteOptions["primary"];
    secondaryContainer?: PaletteOptions["primary"];
    tertiaryContainer?: PaletteOptions["primary"];
    transparentTertiaryContainer?: PaletteOptions["primary"];
    transparentPrimaryContainer?: PaletteOptions["primary"];
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

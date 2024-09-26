import { Palette, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    primaryContainer: Palette["primary"];
    transparentPrimaryContainer: Palette["primary"];
    transparentPrimary: Palette["primary"];
  }

  interface PaletteOptions {
    primaryContainer?: PaletteOptions["primary"];
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

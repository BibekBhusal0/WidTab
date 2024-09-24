import { Palette, PaletteOptions } from "@mui/material";

declare module "@mui/material/styles" {
  interface Palette {
    custom: Palette["primary"];
    primaryContainer: Palette["primary"];
  }

  interface PaletteOptions {
    custom?: PaletteOptions["primary"];
    primaryContainer?: PaletteOptions["primary"];
  }
}

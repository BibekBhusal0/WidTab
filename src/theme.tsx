import { createTheme } from "@mui/material/styles";
import { ModeType, ColorsType } from "./redux/themeSlice";

export const getTheme = (mode: ModeType, colors: ColorsType) => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: colors.primary,
      },
      secondary: {
        main: colors.secondary,
      },
    },
  });
};

import { ReactNode } from "react";
import CustomThemeProvider from "./";
import CssBaseline from "@mui/material/CssBaseline";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/icons.css";
import "@/assets/styles/index.css";

type EPprovider = { children: ReactNode };
const EverythingProvider = ({ children }: EPprovider) => {
  return (
    <CustomThemeProvider>
      <CssBaseline />
      {children}
    </CustomThemeProvider>
  );
};

export default EverythingProvider;

import { ReactNode } from "react";
import CustomThemeProvider from "./";
import { Provider } from "react-redux";
import { persistor, store } from "../redux/store";
import CssBaseline from "@mui/material/CssBaseline";
import { PersistGate } from "redux-persist/integration/react";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/icons.css";
import "@/assets/styles/index.css";

type EPprovider = { children: ReactNode };
const EverythingProvider = ({ children }: EPprovider) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomThemeProvider>
          <CssBaseline />
          {children}
        </CustomThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default EverythingProvider;

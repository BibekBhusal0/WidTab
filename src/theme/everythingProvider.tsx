import { ReactNode, useEffect, useState } from "react";
import CustomThemeProvider from "./";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import CssBaseline from "@mui/material/CssBaseline";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/icons.css";
import "@/assets/styles/index.css";
import "@/assets/styles/editor.css";
import { setInitialStateFromLocalStorage } from "@/utils/redux";
import { Icon } from "@iconify/react";

type EPprovider = { children: ReactNode };

const ReduxStorage = ({ children }: EPprovider) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setInitialStateFromLocalStorage().then(() => setLoading(false));
  }, []);
  return loading ? (
    <div className="flex-center text-8xl gap-2 size-full">
      Loading
      <div className="pt-8">
        <Icon icon="svg-spinners:3-dots-scale" />
      </div>
    </div>
  ) : (
    <>{children}</>
  );
};
const EverythingProvider = ({ children }: EPprovider) => {
  return (
    <Provider store={store}>
      <CustomThemeProvider>
        <CssBaseline />
        <ReduxStorage>{children}</ReduxStorage>
      </CustomThemeProvider>
    </Provider>
  );
};

export default EverythingProvider;

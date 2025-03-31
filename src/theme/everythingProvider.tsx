import { ReactNode, useEffect, useState } from "react";
import CustomThemeProvider from "./";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import CssBaseline from "@mui/material/CssBaseline";
import "@/assets/styles/tailwind.css";
import "@/assets/styles/icons.css";
import "@/assets/styles/index.css";
import { setInitialStateFromLocalStorage } from "@/utils/redux";
import { Icon } from "@iconify/react";
import { TostProvider } from "@/components/tost";

type EPprovider = { children: ReactNode };

const ReduxStorage = ({ children }: EPprovider) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setInitialStateFromLocalStorage().then(() => setLoading(false));

    // const onStorageChange = (
    //   changes: { [key: string]: chrome.storage.StorageChange },
    //   namespace: string
    // ) => {
    //   if (namespace === "local") {
    //     for (const key in changes) {
    //       const k = key as reducers;
    //       if (!reducerNames.includes(k)) continue;
    //       const { newValue } = changes[k];
    //       const oldValue = store.getState()[k];
    //       if (JSON.stringify(newValue) !== JSON.stringify(oldValue)) {
    //         console.log("change detected in", k);
    //         store.dispatch({
    //           type: `${k}/setState`,
    //           payload: { value: newValue, check: false },
    //         });
    //       }
    //     }
    //   }
    // };

    // if (!loading) browser.storage.onChanged.addListener(onStorageChange);
    // return () => {
    //   browser.storage.onChanged.removeListener(onStorageChange);
    // };
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
        <ReduxStorage>
          <TostProvider>{children}</TostProvider>
        </ReduxStorage>
      </CustomThemeProvider>
    </Provider>
  );
};

export default EverythingProvider;

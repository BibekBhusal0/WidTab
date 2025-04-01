import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import Snackbar, { SnackbarProps } from "@mui/material/Snackbar";
import Alert, { AlertProps } from "@mui/material/Alert";

type TostConfig = AlertProps & {
  tostProps?: Omit<SnackbarProps, "open">;
};

type TostContextType = {
  showTost: (config: TostConfig) => void;
};

const TostContext = createContext<TostContextType>({} as TostContextType);

let globalTostRef: TostContextType = {
  showTost: () => {
    throw new Error("TostProvider not mounted");
  },
};

export const TostProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  const [tostConfig, setTostConfig] = useState<TostConfig>({
    tostProps: {},
  });
  const { tostProps, ...props } = tostConfig;

  const showTost = (config: TostConfig) => {
    setTostConfig(config);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  useEffect(() => {
    globalTostRef = { showTost };
    return () => {
      globalTostRef = { showTost: () => {} };
    };
  }, []);

  return (
    <TostContext.Provider value={{ showTost }}>
      {children}
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        autoHideDuration={6000}
        {...tostProps}
        open={open}
        onClose={(event, reason) => {
          handleClose();
          tostProps?.onClose?.(event, reason);
        }}>
        <Alert
          variant="filled"
          {...props}
          onClose={(event) => {
            handleClose();
            props?.onClose?.(event);
          }}
        />
      </Snackbar>
    </TostContext.Provider>
  );
};

export const useTost = () => useContext(TostContext);

export const tost = (config: TostConfig) => {
  globalTostRef.showTost(config);
};

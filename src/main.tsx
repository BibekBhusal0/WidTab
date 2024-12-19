import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import EverythingProvider from "@/theme/everythingProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <EverythingProvider>
      <App />
    </EverythingProvider>
  </StrictMode>
);

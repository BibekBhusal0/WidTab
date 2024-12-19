import { createRoot } from "react-dom/client";
import Options from "./Options";
import EverythingProvider from "@/theme/everythingProvider";

function init() {
  const rootContainer = document.querySelector("#__root");
  if (!rootContainer) throw new Error("Can't find Options root element");
  const root = createRoot(rootContainer);
  root.render(
    <EverythingProvider>
      <Options />
    </EverythingProvider>
  );
}

init();

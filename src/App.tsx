import { useSelector } from "react-redux";
import Footer from "./components/footer";
import CustomThemeProvider from "./theme";
import { StateType } from "./redux/store";
import useCurrentLayout from "./hooks/useCurrentLayout";
import { controlledWidgetsType } from "./types/slice/widgets";
import DynamicLayout from "./layout/dynamic";
import StaticLayout from "./layout/static";
import { Box } from "@mui/material";
import { positionProps } from "./types/slice/layout";
import { cn } from "./utils/cn";

function App() {
  const { currentSpace, controlBarPosition } = useSelector(
    (state: StateType) => state.layout
  );
  const { appProps } = positionProps[controlBarPosition];
  const layout = useCurrentLayout();
  var crrLayout = <DynamicLayout />;
  if (!layout) {
    const l: controlledWidgetsType =
      typeof currentSpace.id === "number" ? "todo" : currentSpace.id;
    crrLayout = <StaticLayout widgetType={l} />;
  }
  return (
    <CustomThemeProvider>
      <Box
        {...appProps}
        className={cn("size-full h-screen relative flex", appProps?.className)}>
        {crrLayout}
        <Footer />
      </Box>
    </CustomThemeProvider>
  );
}

export default App;

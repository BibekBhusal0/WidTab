import { useSelector } from "react-redux";
import Footer from "@/components/footer";
import { StateType } from "@/redux/store";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import { StaticPagesType } from "@/types/slice/widgets";
import DynamicLayout from "@/layout/dynamic";
import StaticLayout from "@/layout/static";
import Box from "@mui/material/Box";
import { positionProps } from "@/types/slice/layout";
import { cn } from "@/utils/cn";
import useCurrentTheme from "@/hooks/useCurrentTheme";

function App() {
  const { currentSpace, toolBarPosition } = useSelector(
    (state: StateType) => state.layout
  );
  const { mode } = useCurrentTheme();
  const { appProps } = positionProps[toolBarPosition];
  const layout = useCurrentLayout();
  var crrLayout = <DynamicLayout />;
  if (!layout) {
    const l: StaticPagesType =
      typeof currentSpace.id === "number" ? "todo" : currentSpace.id;
    crrLayout = <StaticLayout widgetType={l} />;
  }
  return (
    <Box
      {...appProps}
      className={cn(
        "size-full h-screen relative flex",
        appProps?.className,
        mode
      )}>
      {crrLayout}
      <Footer />
    </Box>
  );
}

export default App;

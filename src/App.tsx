import { useSelector } from "react-redux";
import Footer from "./components/footer";
import CustomThemeProvider from "./theme";
import { StateType } from "./redux/store";
import useCurrentLayout from "./hooks/useCurrentLayout";
import { controlledWidgetsType } from "./types/slice/widgets";
import DynamicLayout from "./layout/dynamic";
import StaticLayout from "./layout/static";

function App() {
  const { currentSpace } = useSelector((state: StateType) => state.layout);
  const layout = useCurrentLayout();
  const height = 94;
  var crrLayout = <DynamicLayout height={height} />;
  if (!layout) {
    const l: controlledWidgetsType =
      typeof currentSpace.id === "number" ? "todo" : currentSpace.id;
    crrLayout = <StaticLayout widgetType={l} height={height} />;
  }
  return (
    <CustomThemeProvider>
      <div className="size-full h-screen relative">
        {crrLayout}
        <Footer height={100 - height} />
      </div>
    </CustomThemeProvider>
  );
}

export default App;

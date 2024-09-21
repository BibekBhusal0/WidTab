import Selector from "./components/selector";
import Dummy from "./components/dummy";
import ColorPalette from "./components/colors";
import CustomThemeProvider from "./theme";

function App() {
  return (
    <CustomThemeProvider>
      <div className="p-4">
        <Dummy />
        <ColorPalette />
        <Selector />
      </div>
    </CustomThemeProvider>
  );
}

export default App;

import { useSelector } from "react-redux";
import { StateType } from "./redux/store";
import { getTheme } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";

function App() {
  const { colors, mode } = useSelector((state: StateType) => state.theme);
  const theme = getTheme(mode, colors);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="text-4xl">
        Just testing either gh pages is working or not
      </div>
    </ThemeProvider>
  );
}

export default App;

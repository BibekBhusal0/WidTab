import Footer from "./components/footer";
import Grid from "./components/grid";
import CustomThemeProvider from "./theme";

function App() {
  const height = 94;
  return (
    <CustomThemeProvider>
      <div className="size-full h-screen relative">
        <Grid height={height} />
        <Footer height={100 - height} />
      </div>
    </CustomThemeProvider>
  );
}

export default App;

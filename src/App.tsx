import Footer from "./components/footer";
import Main from "./components/main";
import CustomThemeProvider from "./theme";

function App() {
  const height = 94;
  return (
    <CustomThemeProvider>
      <div className="size-full h-screen relative">
        <Main height={height} />
        <Footer height={100 - height} />
      </div>
    </CustomThemeProvider>
  );
}

export default App;

import AllThemes from "./allThemes";
import CurrentThemeSettings from "./currentTheme";

function ThemeSettings() {
  return (
    <>
      <h1 className="text-3xl py-4">Current Theme</h1>
      <CurrentThemeSettings />
      <h1 className="h1 text-3xl pt-6 pb-6">All Themes</h1>
      <AllThemes />
    </>
  );
}
export default ThemeSettings;

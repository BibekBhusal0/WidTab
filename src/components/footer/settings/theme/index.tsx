import SettingHeader from "../settings-header";
import AllThemes from "./allThemes";
import CurrentThemeSettings from "./currentTheme";

function ThemeSettings() {
  return (
    <>
      <SettingHeader first={true}>Current Theme</SettingHeader>
      <CurrentThemeSettings />
      <SettingHeader>All Themes</SettingHeader>
      <AllThemes />
      <div className="py-2" />
    </>
  );
}
export default ThemeSettings;

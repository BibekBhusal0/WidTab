import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";

function useCurrentTheme() {
  const { allThemes, currentThemeID } = useSelector(
    (state: StateType) => state.theme
  );
  if (allThemes.length === 0) {
    throw new Error("no theme");
  }
  var theme = allThemes.find((p) => p.id === currentThemeID);
  theme = theme ? theme : allThemes[0];

  return theme;
}

export default useCurrentTheme;

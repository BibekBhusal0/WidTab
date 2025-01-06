import { useThemeState } from "@/storage";

function useCurrentTheme() {
  const { allThemes, currentThemeID } = useThemeState();
  if (allThemes.length === 0) {
    throw new Error("no theme");
  }
  var theme = allThemes.find((p) => p.id === currentThemeID);
  theme = theme ? theme : allThemes[0];

  return theme;
}

export default useCurrentTheme;

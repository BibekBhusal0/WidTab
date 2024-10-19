import { iconPackNames, ri_fill, SelectedIcons, transformIcons } from "@/icons";
import useCurrentTheme from "./useCurrentTheme";

function useCurrentIcons() {
  const { iconPack } = useCurrentTheme();
  const icons = SelectedIcons[iconPack] || ri_fill;
  const needsPrefix = iconPackNames[iconPack];
  return transformIcons(icons, needsPrefix ? iconPack : null);
}

export default useCurrentIcons;

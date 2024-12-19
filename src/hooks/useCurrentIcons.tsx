import { iconPackNames, transformIcons } from "@/theme/icons";
import useCurrentTheme from "./useCurrentTheme";
import { ri_fill, SelectedIconPacks } from "@/theme/selected-icons";

function useCurrentIcons() {
  const { iconPack } = useCurrentTheme();
  const icons = SelectedIconPacks[iconPack] || ri_fill;
  const needsPrefix = iconPackNames[iconPack];
  return transformIcons(icons, needsPrefix ? iconPack : null);
}

export default useCurrentIcons;

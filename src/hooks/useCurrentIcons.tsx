import {
  iconPackNames,
  ri_fill,
  SelectedIconPacks,
  transformIcons,
} from "@/theme/icons";
import useCurrentTheme from "./useCurrentTheme";

function useCurrentIcons() {
  const { iconPack } = useCurrentTheme();
  const icons = SelectedIconPacks[iconPack] || ri_fill;
  const needsPrefix = iconPackNames[iconPack];
  return transformIcons(icons, needsPrefix ? iconPack : null);
}

export default useCurrentIcons;

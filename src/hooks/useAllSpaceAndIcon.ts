import { iconAsProp } from "@/theme/icons";
import { StaticPagesType } from "@/types/slice/widgets";
import { staticPagesIcon } from "@/components/footer/settings/spaces/allStaticSpaces";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { CurrentSpaceType } from "@/types/slice/layout";

export type SpaceMapping = {
  name: string;
  icon: iconAsProp;
  space: CurrentSpaceType;
};
export type which = "all" | "static" | "dynamic";

export function useGetSpaceAndIcon(which: which = "all") {
  const themedIcons = useCurrentIcons();
  const staticIcons: SpaceMapping[] = Object.entries(staticPagesIcon).map(
    ([space, { icon, name }]) => {
      return {
        name,
        icon: themedIcons[icon],
        space: { id: space as StaticPagesType, type: "static" },
      };
    }
  );
  const dynamicIcons: SpaceMapping[] = useSelector(
    (state: StateType) => state.layout
  ).allSpaces.map(({ name, icon, id }) => {
    return { name, icon, space: { id, type: "dynamic" } };
  });

  const IconList: SpaceMapping[] =
    which === "dynamic"
      ? dynamicIcons
      : which === "static"
        ? staticIcons
        : [...dynamicIcons, ...staticIcons];
  return IconList;
}

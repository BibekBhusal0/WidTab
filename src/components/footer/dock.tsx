import { useGetSpaceAndIcon } from "@/hooks/useAllSpaceAndIcon";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Dock, dockItemProps } from "../dock";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { Icon2RN } from "@/theme/icons";

export const ToolbarDock = () => {
  const items = useGetSpaceAndIcon();

  const dispatch = useDispatch();
  const { toolBarPosition, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  const dockItems: dockItemProps[] = items.map(({ icon, name, space }) => {
    return {
      icon: (
        <Icon2RN
          icon={icon}
          className={currentSpace === space ? "text-primary-main" : ""}
        />
      ),
      name,
      onClick: () => dispatch(changeCurrentSpace(space)),
    };
  });

  return <Dock position={toolBarPosition} items={dockItems} />;
};

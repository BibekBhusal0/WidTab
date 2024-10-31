import { useGetSpaceAndIcon } from "@/hooks/useAllSpaceAndIcon";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Dock, dockItemProps } from "../dock";
import { changeCurrentSpace } from "@/redux/slice/layout";

export const ToolbarDock = () => {
  const items = useGetSpaceAndIcon();
  const dispatch = useDispatch();
  const { toolBarPosition } = useSelector((state: StateType) => state.layout);
  const dockItems: dockItemProps[] = items.map(({ icon, name, space }) => {
    return {
      icon,
      name,
      onClick: () => dispatch(changeCurrentSpace(space)),
    };
  });

  return <Dock position={toolBarPosition} items={dockItems} />;
};

import { useGetSpaceAndIcon } from "@/hooks/useAllSpaceAndIcon";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Dock, dockItemProps } from "../dock";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { Icon2RN } from "@/theme/icons";
import { useState } from "react";
import useBookmarksUpdate from "@/hooks/useBookmarks";

export const ToolbarDock = () => {
  const dispatch = useDispatch();
  const { toolBarPosition, currentSpace, dockContent } = useSelector(
    (state: StateType) => state.layout
  );

  //   const getBookmarks = () => {
  //     const dockContent = { id: "1" };
  //     chrome.bookmarks.getSubTree(dockContent.id).then((data) => {
  //       console.log("getSubTree", data);
  //     });

  //     chrome.bookmarks.get(dockContent.id).then((data) => {
  //       console.log("get", data);
  //     });
  //     chrome.bookmarks.getChildren(dockContent.id).then((data) => {
  //       console.log("getChildren", data);
  //     });
  //   };
  //   useBookmarksUpdate(getBookmarks);

  var dockItems: dockItemProps[] = [];

  if (dockContent.content === "spaces") {
    const items = useGetSpaceAndIcon(dockContent.id);
    dockItems = items.map(({ icon, name, space }) => ({
      icon: (
        <Icon2RN
          icon={icon}
          className={currentSpace === space ? "text-primary-main" : ""}
        />
      ),
      name,
      onClick: () => dispatch(changeCurrentSpace(space)),
    }));
  } else {
    const items = useGetSpaceAndIcon("all");
    dockItems = items.map(({ icon, name, space }) => ({
      icon: (
        <Icon2RN
          icon={icon}
          className={currentSpace === space ? "text-primary-main" : ""}
        />
      ),
      name,
      onClick: () => dispatch(changeCurrentSpace(space)),
    }));
  }

  return <Dock position={toolBarPosition} items={dockItems} />;
};

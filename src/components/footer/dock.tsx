import { useGetSpaceAndIcon } from "@/hooks/useAllSpaceAndIcon";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Dock, dockItemProps } from "../dock";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { Icon2RN } from "@/theme/icons";
import { useState } from "react";
import useBookmarksUpdate from "@/hooks/useBookmarks";
import { faviconURL } from "@/utils/faviconURL";

export const ToolbarDock = () => {
  const { content } = useSelector(
    (state: StateType) => state.layout.dockContent
  );

  if (content === "spaces") return <DockSpace />;

  return <DockBookmark />;
};

const DockSpace = () => {
  const dispatch = useDispatch();
  const { toolBarPosition, currentSpace, dockContent } = useSelector(
    (state: StateType) => state.layout
  );

  if (dockContent.content !== "spaces") return null;

  const items = useGetSpaceAndIcon(dockContent.id);

  const dockItems = items.map(({ icon, name, space }) => ({
    icon: (
      <Icon2RN
        icon={icon}
        className={currentSpace.id === space.id ? "text-primary-main" : ""}
      />
    ),
    name,
    onClick: () => dispatch(changeCurrentSpace(space)),
  }));

  return <Dock position={toolBarPosition} items={dockItems} />;
};

const DockBookmark = () => {
  const { linkInNewTab } = useSelector((state: StateType) => state.bookmarks);
  const { toolBarPosition, dockContent } = useSelector(
    (state: StateType) => state.layout
  );
  const [bookmark, setBookmark] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );
  const getBookmarks = () => {
    chrome.bookmarks
      .getSubTree(dockContent.id)
      .then((data) => {
        if (Array.isArray(data)) {
          if (data[0].children) {
            setBookmark(data[0].children);
            return;
          }
        }
        setBookmark([]);
      })
      .catch(() => setBookmark([]));
  };
  useBookmarksUpdate(getBookmarks, [dockContent.id]);

  if (dockContent.content !== "bookmark") return null;

  var dockItems: dockItemProps[] =
    bookmark.length === 0
      ? []
      : bookmark
          .map((item) => {
            if (!item.url) return;
            return {
              icon: (
                <img
                  className="iconify"
                  src={faviconURL(item.url, 64)}
                  alt={item.title}
                />
              ),
              name: item.title,
              onClick: () => {
                window.open(item.url), linkInNewTab ? "_blank" : "_self";
              },
            };
          })
          .filter((i) => !!i);

  return <Dock position={toolBarPosition} items={dockItems} />;
};

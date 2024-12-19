import { useGetSpaceAndIcon } from "@/hooks/useAllSpaceAndIcon";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Dock, dockItemProps } from "../dock";
import { changeCurrentSpace } from "@/redux/slice/layout";
import { Icon2RN } from "@/theme/icons";
import { treeNodeArray } from "@/types/slice/bookmark";
import { useBookmarkFolder, useFavoriteBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/utils/cn";
import Favicon from "@/utils/faviconURL";

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
      <div
        className={cn(
          "size-full",
          currentSpace.id === space.id && "text-primary-main"
        )}>
        <Icon2RN icon={icon} />
      </div>
    ),
    name,
    onClick: () => dispatch(changeCurrentSpace(space)),
  }));

  return <Dock position={toolBarPosition} items={dockItems} />;
};

const DockBookmark = () => {
  const { dockContent } = useSelector((state: StateType) => state.layout);
  if (dockContent.content !== "bookmark") return null;
  if (dockContent.id === "favorites") return <DockBookmarkFav />;
  return <DockBookmarkFolder />;
};

function getDockContentFromBookmarks(
  bookmark: treeNodeArray,
  linkInNewTab: boolean = false
): dockItemProps[] {
  var dockItems: dockItemProps[] =
    bookmark.length === 0
      ? []
      : bookmark
          .filter((item) => item?.url)
          .map((item) => ({
            icon: <Favicon src={item.url} className="iconify" />,
            name: item.title,
            onClick: () => {
              window.open(item.url, linkInNewTab ? "_blank" : "_self");
            },
          }));

  return dockItems;
}

const DockBookmarkFav = () => {
  const { linkInNewTab } = useSelector((state: StateType) => state.bookmarks);
  const { toolBarPosition } = useSelector((state: StateType) => state.layout);
  const favoriteBookmarks = useFavoriteBookmarks();
  const dockItems = getDockContentFromBookmarks(
    favoriteBookmarks,
    linkInNewTab
  );
  return <Dock position={toolBarPosition} items={dockItems} />;
};

const DockBookmarkFolder = () => {
  const { linkInNewTab } = useSelector((state: StateType) => state.bookmarks);
  const { toolBarPosition, dockContent } = useSelector(
    (state: StateType) => state.layout
  );
  const bookmark = useBookmarkFolder(dockContent.id);
  if (dockContent.content !== "bookmark" || dockContent.id === "favorites")
    return null;
  const dockItems = getDockContentFromBookmarks(bookmark, linkInNewTab);

  return <Dock position={toolBarPosition} items={dockItems} />;
};

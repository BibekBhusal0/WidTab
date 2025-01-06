import { useGetSpaceAndIcon } from "@/hooks/useAllSpaceAndIcon";
import { Dock, dockItemProps } from "../dock";
import { Icon2RN } from "@/theme/icons";
import { treeNodeArray } from "@/types/slice/bookmark";
import { useBookmarkFolder, useFavoriteBookmarks } from "@/hooks/useBookmarks";
import { cn } from "@/utils/cn";
import Favicon from "@/utils/faviconURL";
import { openLink } from "@/utils/bookmark";
import { useLayout } from "@/storage/";
import { useBookmarkState } from "@/storage/";
import { changeCurrentSpace } from "@/storage/layout";

export const ToolbarDock = () => {
  const { content } = useLayout().dockContent;

  if (content === "spaces") return <DockSpace />;
  return <DockBookmark />;
};

const DockSpace = () => {
  const { dockContent, currentSpace, toolBarPosition } = useLayout();

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
    onClick: () => changeCurrentSpace(space),
  }));

  return <Dock position={toolBarPosition} items={dockItems} />;
};

const DockBookmark = () => {
  const { dockContent } = useLayout();
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
            onClick: (e) => {
              openLink(item.url || "", linkInNewTab, e);
            },
          }));

  return dockItems;
}

const DockBookmarkFav = () => {
  const { toolBarPosition } = useLayout();
  const { linkInNewTab } = useBookmarkState();
  const favoriteBookmarks = useFavoriteBookmarks();
  const dockItems = getDockContentFromBookmarks(
    favoriteBookmarks,
    linkInNewTab
  );
  return <Dock position={toolBarPosition} items={dockItems} />;
};

const DockBookmarkFolder = () => {
  const { toolBarPosition, dockContent } = useLayout();
  const { linkInNewTab } = useBookmarkState();
  const bookmark = useBookmarkFolder(dockContent.id);
  if (dockContent.content !== "bookmark" || dockContent.id === "favorites")
    return null;
  const dockItems = getDockContentFromBookmarks(bookmark, linkInNewTab);

  return <Dock position={toolBarPosition} items={dockItems} />;
};

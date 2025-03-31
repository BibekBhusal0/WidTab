import BookmarkBreadcrumb from "@/components/bookmarks/breadcrumb";
import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import { useBookmarkFolder, useBookmarkSiblings } from "@/hooks/useBookmarks";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { BookmarkWidgetType } from "@/types/slice/bookmark";
import { cn } from "@/utils/cn";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { reorderBookmarks } from "@/utils/bookmark";
import { useDispatch } from "react-redux";

function BookmarkWidget(props: BookmarkWidgetType) {
  const { folderId, iconSize, breadcrumb, tabs } = props;
  const bookmark = useBookmarkFolder(folderId);
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => {
    dispatch(
      currentSpaceEditWidget({
        type: "bookmark",
        values: { ...props, folderId: id },
      }),
    );
  };
  const header_height =
    (Number(breadcrumb) + Number(tabs)) * 28 + Number(breadcrumb || tabs) * 16;

  return (
    <>
      {(breadcrumb || tabs) && (
        <Box
          className={cn("bg-tertiary-container-default p-2 pb-4")}
          sx={{
            height: `${header_height}px`,
            "& .text-xl": { fontSize: "13px" },
          }}
        >
          {breadcrumb && (
            <BookmarkBreadcrumb
              currentFolderID={folderId}
              onFolderChange={onFolderChange}
            />
          )}
          {tabs && (
            <BookmarkTabs folderId={folderId} onFolderChange={onFolderChange} />
          )}
        </Box>
      )}
      <ScrollArea
        style={{ height: `calc(100% - ${header_height + 4}px)` }}
        className="px-2 size-full"
      >
        <div className="py-2">
          <BookmarkGrid
            contextMenu={false}
            bookmarks={bookmark}
            folderSize={iconSize}
            onFolderChange={onFolderChange}
            onReorder={reorderBookmarks}
          />
        </div>
      </ScrollArea>
    </>
  );
}

function BookmarkTabs({
  folderId,
  onFolderChange,
}: {
  folderId: string;
  onFolderChange: (id: string) => any;
}) {
  const bookmark = useBookmarkSiblings(folderId);

  const tabIndex = bookmark.findIndex((b) => b.id === folderId);
  const handleChange = (_: any, newValue: number) => {
    onFolderChange(bookmark[newValue].id);
  };

  return (
    <Tabs
      value={tabIndex}
      variant="scrollable"
      scrollButtons="auto"
      onChange={handleChange}
      sx={{ height: "30px", minHeight: "30px", maxHeight: "30px" }}
    >
      {bookmark.map((b, index) => (
        <Tab
          key={index}
          value={index}
          label={b.title}
          sx={{
            minWidth: 0,
            minHeight: 0,
            padding: "5px 10px",
            fontSize: "15px",
          }}
        />
      ))}
    </Tabs>
  );
}

export default BookmarkWidget;

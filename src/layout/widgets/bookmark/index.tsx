import BookmarkGrid from "@/components/bookmarks/grid";
import { ScrollArea } from "@/components/scrollarea";
import useBookmarksUpdate from "@/hooks/useBookmarks";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { BookmarkWidgetType } from "@/types/slice/bookmark";
import { useState } from "react";
import { useDispatch } from "react-redux";

function BookmarkWidget(props: BookmarkWidgetType) {
  const { folderId, iconSize } = props;
  const [bookmark, setBookmark] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );

  const getBookmarks = () => {
    chrome.bookmarks
      .getSubTree(folderId)
      .then((data) => {
        if (Array.isArray(data)) {
          if (data[0]?.children) {
            setBookmark(data[0].children);
            return;
          }
        }
        setBookmark([]);
      })
      .catch(() => setBookmark([]));
  };

  useBookmarksUpdate(getBookmarks, [folderId]);
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => {
    dispatch(
      currentSpaceEditWidget({
        type: "bookmark",
        values: { ...props, folderId: id },
      })
    );
  };

  return (
    <ScrollArea key={folderId} className="p-2 size-full">
      <BookmarkGrid
        bookmarks={bookmark}
        folderSize={iconSize}
        onFolderChange={onFolderChange}
      />
    </ScrollArea>
  );
}

export default BookmarkWidget;

import BookmarkGrid from "@/components/bookmarks/grid";
import useBookmarks from "@/hooks/useBookmarks";
import { currentSpaceEditWidget } from "@/redux/slice/layout";
import { BookmarkWidgetType } from "@/types/slice/bookmark";
import { useState } from "react";
import { useDispatch } from "react-redux";

function BookmarkWidget(props: BookmarkWidgetType) {
  const { id, iconSize } = props;
  const [bookmark, setBookmark] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );

  const getBookmarks = () => {
    chrome.bookmarks
      .getChildren(String(id))
      .then((data) => {
        setBookmark(Array.isArray(data) ? data : []);
      })
      .catch(() => setBookmark([]));
  };
  useBookmarks(getBookmarks);
  const dispatch = useDispatch();
  const onFolderChange = (id: string) => {
    const i = parseInt(id);
    if (typeof i === "number")
      dispatch(
        currentSpaceEditWidget({
          type: "bookmark",
          values: { ...props, id: i },
        })
      );
  };

  return (
    <>
      <BookmarkGrid
        bookmarks={bookmark}
        folderSize={iconSize}
        onFolderChange={onFolderChange}
      />
    </>
  );
}

export default BookmarkWidget;

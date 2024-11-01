import Breadcrumbs from "@mui/material/Breadcrumbs";
import { findPath } from "@/utils/bookmark";
import { ExtraBookmarkProps } from "@/types/slice/bookmark";
import { useEffect, useState } from "react";

function BookmarkBreadcrumb({
  onFolderChange = () => {},
  currentFolderID,
}: ExtraBookmarkProps & { currentFolderID: string }) {
  const [path, setPath] = useState<chrome.bookmarks.BookmarkTreeNode[]>([]);

  useEffect(() => {
    findPath(currentFolderID).then((data) => {
      data.unshift();
      setPath(data);
    });
  }, [currentFolderID]);

  return (
    <Breadcrumbs>
      {path.map((item, index) => (
        <div
          key={index}
          className="hover:underline cursor-pointer text-xl"
          onClick={() => onFolderChange(item.id)}>
          {item.title}
        </div>
      ))}
    </Breadcrumbs>
  );
}

export default BookmarkBreadcrumb;

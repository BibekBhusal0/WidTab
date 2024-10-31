import Breadcrumbs from "@mui/material/Breadcrumbs";
import { findPath } from "@/utils/bookmark";
import { BookmarkTree, ExtraBookmarkProps } from "@/types/slice/bookmark";

function BookmarkBreadcrumb({
  bookmarks,
  onFolderChange = () => {},
  currentFolderID,
}: BookmarkTree & ExtraBookmarkProps & { currentFolderID: string }) {
  const path = findPath(bookmarks, currentFolderID);

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

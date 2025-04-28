import Breadcrumbs from "@mui/material/Breadcrumbs";
import { findPath } from "@/utils/bookmark";
import { ExtraBookmarkProps } from "@/types/slice/bookmark";
import { useEffect, useState } from "react";
import { treeNodeArray } from "@/types/slice/bookmark";

function BookmarkBreadcrumb({
  onFolderChange = () => {},
  currentFolderID,
}: ExtraBookmarkProps & { currentFolderID: string }) {
  const [path, setPath] = useState<treeNodeArray>([]);

  useEffect(() => {
    findPath(currentFolderID).then((data) => setPath(data));
  }, [currentFolderID]);

  return (
    <Breadcrumbs>
      {path.map((item, index) => (
        <div
          key={index}
          className="cursor-pointer text-xl hover:underline"
          onClick={() => onFolderChange(item.id)}>
          {item.title}
        </div>
      ))}
    </Breadcrumbs>
  );
}

export default BookmarkBreadcrumb;

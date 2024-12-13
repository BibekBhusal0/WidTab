import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import {
  BookmarkTree,
  ExtraBookmarkProps,
  folderSizeMapping,
  TakeBookmarksProps,
} from "@/types/slice/bookmark";
import useFullSize from "@/hooks/useFullSize";
import { LinkContextMenu } from "./contextMenu";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Favicon from "@/utils/faviconURL";

type l = { openLinkInNewTab?: boolean; contextMenu?: boolean };

function BookmarkGrid(props: ExtraBookmarkProps & BookmarkTree & l) {
  const { folderSize = "small", bookmarks } = props;
  const itemWidth = folderSizeMapping[folderSize];
  const gap = 16;
  const {
    ref,
    size: { width },
  } = useFullSize([]);
  const numItems = Math.floor((width + gap) / (itemWidth + gap));
  const finalWidth = numItems * (itemWidth + gap) - gap;

  const content =
    !bookmarks || bookmarks.length === 0 ? (
      <div className="text-center text-3xl pt-4">No bookmarks Found Here</div>
    ) : (
      <div className="flex flex-wrap mx-auto w-full" style={{ gap }}>
        <Bookmarks {...props} />
      </div>
    );

  return (
    <div ref={ref} className="size-full">
      <div style={{ maxWidth: finalWidth }} className="mx-auto">
        {content}
      </div>
    </div>
  );
}

function Bookmarks(props: ExtraBookmarkProps & TakeBookmarksProps & l) {
  const { favorites, linkInNewTab } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const {
    bookmarks,
    folderSize = "small",
    onFolderChange = () => {},
    contextMenu = true,
    openLinkInNewTab = linkInNewTab,
  } = props;

  if (Array.isArray(bookmarks)) {
    return bookmarks.map((child) => (
      <Bookmarks key={child.id} {...props} bookmarks={child} />
    ));
  }
  const size = folderSizeMapping[folderSize];
  const cls = "flex-center flex-col gap-2 size-full relative p-1";
  const textCls = "px-2 truncate w-full text-center";
  const fav = favorites.includes(bookmarks.id);
  const link = (bookmarks: chrome.bookmarks.BookmarkTreeNode) => {
    return (
      <a
        className={cn(cls)}
        href={bookmarks.url}
        target={openLinkInNewTab ? "_blank" : "_self"}>
        <Favicon src={bookmarks.url} className="size-1/2 aspect-square" />

        <div className="flex items-center justify-between w-full">
          {fav && contextMenu && <Icon className="text-2xl" icon="mdi:heart" />}
          <div className={cn(textCls)}>{bookmarks.title}</div>
        </div>
      </a>
    );
  };

  const content = !bookmarks.url ? (
    <div
      onClick={() => onFolderChange(bookmarks.id)}
      className={cn(cls, "gap-2")}>
      <Icon width={size * 0.7} icon="ic:round-folder" />
      <div className={cn(textCls)}>{bookmarks.title}</div>
    </div>
  ) : contextMenu ? (
    <LinkContextMenu id={bookmarks.id}>{link(bookmarks)}</LinkContextMenu>
  ) : (
    link(bookmarks)
  );

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: "secondaryContainer.paper",
        width: size,
        height: size,
        fontSize: size / 9,
      }}>
      <CardActionArea sx={{ width: "100%", height: "100%" }}>
        {content}
      </CardActionArea>
    </Card>
  );
}

export default BookmarkGrid;

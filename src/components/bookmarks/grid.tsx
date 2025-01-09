import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { cn } from "@/utils/cn";
import {
  ExtraBookmarkProps,
  folderSizeMapping,
  TakeBookmarksProps,
} from "@/types/slice/bookmark";
import useFullSize from "@/hooks/useFullSize";
import { LinkContextMenu } from "./contextMenu";
import Card from "@mui/material/Card";
import Favicon from "@/utils/faviconURL";
import { HoverFolder } from "./folder";
import { bookmarkTreeNodeArray, treeNode } from "@/types/slice/bookmark";
import { treeToLayout } from "@/utils/bookmark";
import ReactGridLayout from "react-grid-layout";
import { useMemo, useRef } from "react";

type l = { openLinkInNewTab?: boolean; contextMenu?: boolean };

function BookmarkGrid(props: ExtraBookmarkProps & bookmarkTreeNodeArray & l) {
  const { folderSize = "small", bookmarks, onReorder } = props;
  const itemWidth = folderSizeMapping[folderSize];
  const dragCount = useRef(1);
  const gap = 16;
  const {
    ref,
    size: { width },
  } = useFullSize([]);
  const numItems = Math.floor((width + gap) / (itemWidth + gap));
  const finalWidth = numItems * (itemWidth + gap) - gap;
  const layout = useMemo(() => {
    const t = treeToLayout(bookmarks, numItems || 1);
    console.log(t);
    return t;
  }, [bookmarks.length, numItems, dragCount.current]);

  const content =
    !bookmarks || bookmarks.length === 0 ? (
      <div className="text-center text-3xl pt-4">No bookmarks Found Here</div>
    ) : (
      <ReactGridLayout
        layout={layout}
        onLayoutChange={(layout) => onReorder?.(layout, numItems)}
        //
        cols={numItems}
        rowHeight={itemWidth}
        width={finalWidth}
        margin={[gap, gap]}
        //
        isDraggable={!!onReorder}
        onDragStop={() => dragCount.current++}
        isResizable={false}
        compactType={"horizontal"}

        //
      >
        {bookmarks.map((bookmark) => (
          <div key={bookmark.id}>
            <Bookmarks {...props} bookmarks={bookmark} />
          </div>
        ))}
      </ReactGridLayout>
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
  const link = (bookmarks: treeNode) => {
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
      <div className="w-[70%] h-[50%] relative">
        <HoverFolder
          empty={!bookmarks.children || bookmarks.children.length === 0}
        />
      </div>
      <div className={cn(textCls)}>{bookmarks.title}</div>
    </div>
  ) : contextMenu ? (
    <LinkContextMenu id={bookmarks.id}>{link(bookmarks)}</LinkContextMenu>
  ) : (
    link(bookmarks)
  );

  return (
    <Card
      variant="elevation"
      className="group"
      sx={{
        backgroundColor: "secondaryContainer.paper",
        width: size,
        height: size,
        fontSize: size / 9,
        "& .rounded-2xl.rounded-tl-none": {
          borderRadius: size / 40,
          borderTopLeftRadius: 0,
        },
        "& .rounded-2xl.rounded-tr-none": {
          borderRadius: size / 40,
          borderTopRightRadius: 0,
        },
        "& .after:rounded-t-2xl": {
          ":after": {
            borderTopLeftRadius: size / 40,
            borderTopRightRadius: size / 40,
          },
        },
      }}>
      {content}
    </Card>
  );
}

export default BookmarkGrid;

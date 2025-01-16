import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import {
  ExtraBookmarkProps,
  folderSizeMapping,
  TakeBookmarksProps,
} from "@/types/slice/bookmark";
import useFullSize from "@/hooks/useFullSize";
import { FolderContextMenu, LinkContextMenu } from "./contextMenu";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Favicon from "@/utils/faviconURL";
import { HoverFolder } from "./folder";
import { bookmarkTreeNodeArray } from "@/types/slice/bookmark";
import {
  Sortable,
  SortableDragHandle,
  SortableItem,
} from "@/components/sortable";
import { openLink } from "@/utils/bookmark";

type l = { contextMenu?: boolean };

function BookmarkGrid(props: ExtraBookmarkProps & bookmarkTreeNodeArray & l) {
  const { folderSize = "small", bookmarks, onReorder } = props;
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
      <Sortable
        orientation="mixed"
        value={bookmarks}
        onValueChange={onReorder}
        //
      >
        <div className="flex flex-wrap mx-auto w-full" style={{ gap }}>
          <Bookmarks {...props} />
        </div>
      </Sortable>
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
  } = props;

  if (Array.isArray(bookmarks)) {
    return bookmarks.map((child) => (
      <Bookmarks key={child.id} {...props} bookmarks={child} />
    ));
  }
  const linkAndContextMenu = bookmarks.url && contextMenu;
  const size = folderSizeMapping[folderSize];
  const fav = favorites.includes(bookmarks.id);
  const content = (
    <Card
      variant="elevation"
      onClick={(e) => {
        bookmarks.url
          ? openLink(bookmarks.url, linkInNewTab, e)
          : onFolderChange(bookmarks.id);
      }}
      className="group cursor-pointer"
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
      <CardActionArea className="size-full p-1">
        <div className="flex-center flex-col gap-1 size-full">
          {!bookmarks.url ? (
            <div className="w-[70%] h-[50%] relative">
              <HoverFolder empty={!bookmarks.children?.length} />
            </div>
          ) : (
            <Favicon src={bookmarks.url} className="size-1/2 aspect-square" />
          )}
          <SortableDragHandle className="flex-center w-full px-1 py-0.5 gap-[2px]">
            {fav && linkAndContextMenu && (
              <Icon style={{ fontSize: size / 5 }} icon="mdi:heart" />
            )}
            <div className="truncate w-full text-center">{bookmarks.title}</div>
          </SortableDragHandle>
        </div>
      </CardActionArea>
    </Card>
  );

  const ContextMenuWrapper = bookmarks.url
    ? LinkContextMenu
    : FolderContextMenu;

  return (
    <SortableItem value={bookmarks.id}>
      {contextMenu ? (
        <ContextMenuWrapper
          id={bookmarks.id}
          containerProps={{ sx: { width: size, height: size } }}
          children={content}
        />
      ) : (
        content
      )}
    </SortableItem>
  );
}

export default BookmarkGrid;

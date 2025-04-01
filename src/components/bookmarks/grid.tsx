import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { ExtraBookmarkProps, folderSizeMapping, TakeBookmarksProps } from "@/types/slice/bookmark";
import useFullSize from "@/hooks/useFullSize";
import { FolderContextMenu, LinkContextMenu } from "./contextMenu";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Favicon from "@/utils/faviconURL";
import { HoverFolder } from "./folder";
import { bookmarkTreeNodeArray } from "@/types/slice/bookmark";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/sortable";
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
      <div className="pt-4 text-center text-3xl">No bookmarks Found Here</div>
    ) : (
      <Sortable
        orientation="mixed"
        value={bookmarks}
        onValueChange={onReorder}
        constraint={{ distance: 10, delay: 400 }}
        //
      >
        <div className="mx-auto flex w-full flex-wrap" style={{ gap }}>
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
  const { favorites, linkInNewTab, folderIcons } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const { bookmarks, folderSize = "small", onFolderChange = () => {}, contextMenu = true } = props;

  if (Array.isArray(bookmarks)) {
    return bookmarks.map((child) => <Bookmarks key={child.id} {...props} bookmarks={child} />);
  }
  const linkAndContextMenu = bookmarks.url && contextMenu;
  const size = folderSizeMapping[folderSize];
  const fav = favorites.includes(bookmarks.id);
  const content = (
    <Card
      variant="elevation"
      onClick={(e) => {
        bookmarks.url ? openLink(bookmarks.url, linkInNewTab, e) : onFolderChange(bookmarks.id);
      }}
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
      <CardActionArea className="size-full p-1" sx={{ cursor: "unset" }}>
        <SortableDragHandle className="flex-center size-full cursor-pointer flex-col gap-1 data-[state=dragging]:cursor-grabbing">
          {!bookmarks.url ? (
            <div className="relative h-[50%] w-[70%]">
              <HoverFolder empty={!bookmarks.children?.length} icon={folderIcons?.[bookmarks.id]} />
            </div>
          ) : (
            <Favicon src={bookmarks.url} className="aspect-square size-1/2" />
          )}
          <div className="flex-center w-full gap-[2px] px-1 py-0.5">
            {fav && linkAndContextMenu && <Icon style={{ fontSize: size / 5 }} icon="mdi:heart" />}
            <div className="w-full truncate text-center">{bookmarks.title}</div>
          </div>
        </SortableDragHandle>
      </CardActionArea>
    </Card>
  );

  const ContextMenuWrapper = bookmarks.url ? LinkContextMenu : FolderContextMenu;

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

import Folder from "@/components/bookmarks/folder";
import { changeCurrentFolder, toggleFavorites } from "@/redux/slice/bookmark";
import { StateType } from "@/redux/store";
import { Icon } from "@iconify/react";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TakeBookmarksProps } from "@/types/slice/bookmark";
import { LinkContextMenu } from "./contextMenu";
import { bookmarkTreeNode } from "@/types/slice/bookmark";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import Favicon from "@/utils/faviconURL";
import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { findBookmarkById } from "@/utils/bookmark";
import { openLink } from "@/utils/bookmark";

function BookmarkTree() {
  const { bookmarks } = useAllBookmarks();
  if (!bookmarks || bookmarks.length === 0) return null;

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    const activeBookmark = findBookmarkById(bookmarks, `${active.id}`);
    const overBookmark = findBookmarkById(bookmarks, `${over.id}`);
    if (!activeBookmark || !overBookmark) return;
    alert(`${activeBookmark.title} -> ${overBookmark.title}`);
  }

  return (
    <div className="px-3">
      <DndContext onDragEnd={handleDragEnd}>
        <BookmarkItem bookmarks={bookmarks} />
      </DndContext>
    </div>
  );
}

function BookmarkItem({ bookmarks }: TakeBookmarksProps) {
  if (Array.isArray(bookmarks)) {
    return bookmarks.map((child) => (
      <BookmarkItem key={child.id} bookmarks={child} />
    ));
  }
  if (bookmarks.children) return <BookmarkFolder bookmarks={bookmarks} />;
  return <BookmarkTreeLink bookmarks={bookmarks} />;
}

function BookmarkTreeLink({ bookmarks }: bookmarkTreeNode) {
  const { favorites, linkInNewTab } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const dispatch = useDispatch();
  const fav = favorites.includes(bookmarks.id);
  const toggleItem = () => dispatch(toggleFavorites(bookmarks.id));

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: bookmarks.id,
    });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
  };

  return (
    <LinkContextMenu id={bookmarks.id}>
      <div
        onClick={(e) => openLink(bookmarks.url || "", linkInNewTab, e)}
        ref={setNodeRef}
        {...attributes}
        style={style}
        className={cn("w-full flex items-center gap-4 pl-2 ml-2")}>
        <div className="py-1 my-1 w-full">
          <div className="flex items-center gap-4 w-full">
            <Favicon src={bookmarks.url} className="size-10 aspect-square" />
            <div {...listeners} className="text-xl truncate">
              {bookmarks.title}
            </div>
          </div>
        </div>
        {fav && (
          <IconButton onClick={toggleItem}>
            <Icon className="text-3xl" icon="mdi:heart" />
          </IconButton>
        )}
      </div>
    </LinkContextMenu>
  );
}

function BookmarkFolder({ bookmarks }: bookmarkTreeNode) {
  const [open, setOpen] = useState(
    bookmarks.id === "1" || bookmarks.id === "0"
  );
  const dispatch = useDispatch();
  const changeFolder = () => {
    if (!open) {
      dispatch(changeCurrentFolder(bookmarks.id));
    }
  };
  const {
    attributes,
    listeners,
    setNodeRef: draggableRef,
    transform,
    isDragging,
  } = useDraggable({
    id: bookmarks.id,
  });
  const { setNodeRef: droppableRef, isOver } = useDroppable({
    id: bookmarks.id,
  });

  const style: React.CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    transform: CSS.Translate.toString(transform),
  };

  if (!bookmarks.children) return null;

  return (
    <div
      ref={droppableRef}
      className={cn(
        "relative py-1 my-1 ml-1 pl-2  border-2 border-transparent",
        isOver && "border-primary-3"
      )}>
      <div
        className="flex w-full items-center gap-4 cursor-pointer"
        ref={draggableRef}
        style={style}
        {...attributes}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
          changeFolder();
        }}>
        <div className="aspect-square h-full shrink-0">
          <Folder open={open} />
        </div>
        <div {...listeners} className="text-2xl truncate">
          {bookmarks.title}
        </div>
      </div>

      <AnimatePresence>
        {open &&
          bookmarks.children.map((child: any) => (
            <motion.div
              key={child.id}
              initial={{ height: 0, opacity: 0.4 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ type: "spring", duration: 0.3, bounce: 0 }}
              //   className="ml-2 pl-2"
              //
            >
              <BookmarkItem bookmarks={child} />
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  );
}

export default BookmarkTree;

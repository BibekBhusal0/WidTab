import Folder from "@/components/bookmarks/folder";
import { changeCurrentFolder } from "@/redux/slice/bookmark";
import { StateType } from "@/redux/store";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TakeBookmarksProps } from "@/types/slice/bookmark";
import { FolderContextMenu, LinkContextMenu } from "./contextMenu";
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
import { findBookmarkById, findPath } from "@/utils/bookmark";
import { openLink } from "@/utils/bookmark";

type defaultOpen = { paths?: string[] };
function BookmarkTree() {
  const { bookmarks } = useAllBookmarks();
  const [path, setPath] = useState<string[]>([]);
  const { currentFolderID } = useSelector(
    (state: StateType) => state.bookmarks
  );
  useEffect(() => {
    findPath(currentFolderID).then((data) => {
      setPath(data.map((item) => item.id));
    });
  }, [currentFolderID]);

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
        <BookmarkItem bookmarks={bookmarks} paths={path} />
      </DndContext>
    </div>
  );
}

function BookmarkItem({ bookmarks, paths }: TakeBookmarksProps & defaultOpen) {
  if (Array.isArray(bookmarks)) {
    return bookmarks.map((child) => (
      <BookmarkItem key={child.id} bookmarks={child} paths={paths} />
    ));
  }
  if (bookmarks.children)
    return <BookmarkFolder bookmarks={bookmarks} paths={paths} />;
  return <BookmarkTreeLink bookmarks={bookmarks} />;
}

function BookmarkTreeLink({ bookmarks }: bookmarkTreeNode) {
  const { favorites, linkInNewTab } = useSelector(
    (state: StateType) => state.bookmarks
  );
  const fav = favorites.includes(bookmarks.id);

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
        {fav && <Icon className="text-3xl" icon="mdi:heart" />}
      </div>
    </LinkContextMenu>
  );
}

function BookmarkFolder({ bookmarks, paths }: bookmarkTreeNode & defaultOpen) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    console.log(paths, bookmarks.id);
    if (paths?.includes(bookmarks.id)) {
      setOpen(true);
    }
  }, [paths, bookmarks.id]);
  const dispatch = useDispatch();
  const changeFolder = () => {
    dispatch(changeCurrentFolder(bookmarks.id));
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
    <div ref={draggableRef} style={style} {...attributes}>
      <div
        ref={droppableRef}
        className={cn(
          "relative py-1 my-1 ml-1 pl-2  border-2 border-transparent",
          isOver && "border-primary-3"
        )}>
        <FolderContextMenu id={bookmarks.id}>
          <div
            className="flex w-full items-center gap-4 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setOpen(!open);
              changeFolder();
            }}>
            <div className="aspect-square h-full shrink-0">
              <Folder {...{ open }} />
            </div>
            <div {...listeners} className="text-2xl truncate">
              {bookmarks.title}
            </div>
          </div>
        </FolderContextMenu>

        <AnimatePresence>
          {open &&
            !isDragging &&
            bookmarks.children.map((child: any) => (
              <motion.div
                key={child.id}
                initial={{ height: 0, opacity: 0.4 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ type: "spring", duration: 0.3, bounce: 0 }}
                //
              >
                <BookmarkItem bookmarks={child} paths={paths} />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default BookmarkTree;

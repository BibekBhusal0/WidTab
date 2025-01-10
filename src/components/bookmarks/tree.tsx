import Folder from "@/components/bookmarks/folder";
import { changeCurrentFolder } from "@/redux/slice/bookmark";
import { StateType } from "@/redux/store";
import { Icon } from "@iconify/react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TakeBookmarksProps } from "@/types/slice/bookmark";
import { LinkContextMenu } from "./contextMenu";
import { bookmarkTreeNode } from "@/types/slice/bookmark";
import { useAllBookmarks } from "@/hooks/useBookmarks";
import Favicon from "@/utils/faviconURL";

function BookmarkTree() {
  const { bookmarks } = useAllBookmarks();
  if (!bookmarks || bookmarks.length === 0) return null;
  return (
    <div className="px-3">
      <BookmarkItem bookmarks={bookmarks} />
    </div>
  );
}

function BookmarkItem({ bookmarks }: TakeBookmarksProps) {
  if (Array.isArray(bookmarks))
    return bookmarks.map((child) => (
      <BookmarkItem key={child.id} bookmarks={child} />
    ));
  if (bookmarks.children) return <BookmarkFolder bookmarks={bookmarks} />;
  return <BookmarkTreeLink bookmarks={bookmarks} />;
}

function BookmarkTreeLink({ bookmarks }: bookmarkTreeNode) {
  const { favorites } = useSelector((state: StateType) => state.bookmarks);
  const dispatch = useDispatch();
  const fav = favorites.includes(bookmarks.id);

  return (
    <LinkContextMenu
      id={bookmarks.id}
      containerProps={{
        className: "flex items-center gap-4",
      }}>
      <a
        style={{ width: fav ? `calc(100% - 46px)` : "100%" }}
        className="flex items-center gap-4 my-4"
        href={bookmarks.url}
        target="_blank">
        <Favicon src={bookmarks.url} className="size-10 aspect-square" />

        <div className="text-xl truncate">{bookmarks.title}</div>
      </a>
      {fav && <Icon className="text-3xl" icon="mdi:heart" />}
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
  if (!bookmarks.children) return null;
  return (
    <Accordion
      sx={{
        background: "transparent",
        "& .MuiAccordionSummary-root": {
          display: "block",
        },
        "& .MuiAccordionDetails-root": {
          paddingRight: "0px",
          paddingLeft: "15px",
        },
        "& .MuiAccordion-root::before": {
          display: "none",
        },
      }}
      expanded={open}
      disableGutters
      onChange={(_, e) => setOpen(e)}
      elevation={0}
      className="relative">
      <AccordionSummary
        sx={{ gap: "20px", padding: "0px" }}
        onClick={changeFolder}>
        <div className="flex w-full items-center flex-start gap-4">
          <div className="aspect-square h-full">
            <Folder open={open} />
          </div>
          <div className="text-2xl truncate">{bookmarks.title}</div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        {bookmarks.children.map((child: any) => (
          <BookmarkItem key={child.id} bookmarks={child} />
        ))}
      </AccordionDetails>
    </Accordion>
  );
}
export default BookmarkTree;

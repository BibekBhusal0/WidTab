import Autocomplete from "@mui/material/Autocomplete";
import {
  FunctionComponent,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Icon } from "@iconify/react";
import { faviconURL } from "@/utils/faviconURL";
import { changeCurrentFolder } from "@/redux/slice/bookmark";

function BookmarkSearch() {
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchedBookmarks, SetSearchedBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([]);
  const deferredSearchTerm = useDeferredValue(searchTerm);

  useEffect(() => {
    chrome.bookmarks.search(deferredSearchTerm, (bookmarks) => {
      SetSearchedBookmarks(bookmarks);
    });
  }, [deferredSearchTerm]);

  const handleChange = (
    _: React.SyntheticEvent<Element, Event>,
    bookmark: chrome.bookmarks.BookmarkTreeNode | null
  ) => {
    if (!bookmark) return;
    if (bookmark.url) {
      window.open(bookmark.url, "_blank");
    } else {
      dispatch(changeCurrentFolder(bookmark.id));
    }
    setSearchTerm("");
  };

  return (
    <Autocomplete
      fullWidth
      inputValue={searchTerm}
      onInputChange={(_, value) => setSearchTerm(value || "")}
      getOptionLabel={(bookmark) => bookmark.title}
      onChange={handleChange}
      options={searchedBookmarks}
      renderOption={(props, bookmark) => {
        if (!bookmark) return null;
        return (
          <li {...props}>
            <Link link={bookmark} />
          </li>
        );
      }}
      renderInput={(props) => (
        <TextField {...props} placeholder="Search Bookmarks" />
      )}
    />
  );
}

interface LinkProps {
  link: chrome.bookmarks.BookmarkTreeNode;
}

const Link: FunctionComponent<LinkProps> = ({ link }) => {
  const { favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );

  const { title, url, id } = link;
  const cls = "w-10 aspect-square";
  const icon = url ? (
    <img className={cls} src={faviconURL(url)} />
  ) : (
    <Icon className={cls} icon="ic:round-folder" />
  );

  return (
    <div className="size-full flex gap-4 items-center text-xl">
      {icon}
      <div className="text-xl truncate">{title}</div>
      {favorites.includes(id) && (
        <>
          <div className="flex-grow"></div>
          <Icon className="text-2xl flex-shrink-0" icon="mdi:heart" />
        </>
      )}
    </div>
  );
};

export default BookmarkSearch;

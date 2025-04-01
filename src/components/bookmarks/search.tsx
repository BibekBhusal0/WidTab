import Autocomplete from "@mui/material/Autocomplete";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Icon } from "@iconify/react";
import { changeCurrentFolder } from "@/redux/slice/bookmark";
import Favicon from "@/utils/faviconURL";
import { treeNode } from "@/types/slice/bookmark";
import { useBookmarkSearch } from "@/hooks/useBookmarks";
import { openLink } from "@/utils/bookmark";

function BookmarkSearch() {
  const dispatch = useDispatch();
  const { linkInNewTab } = useSelector((state: StateType) => state.bookmarks);
  const [searchTerm, setSearchTerm] = useState("");
  const searchedBookmarks = useBookmarkSearch(searchTerm);

  const handleChange = (_: React.SyntheticEvent<Element, Event>, bookmark: treeNode | null) => {
    if (!bookmark) return;
    if (bookmark.url) openLink(bookmark.url, linkInNewTab);
    else dispatch(changeCurrentFolder(bookmark.id));
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
      renderInput={(props) => <TextField {...props} placeholder="Search Bookmarks" />}
    />
  );
}

interface LinkProps {
  link: treeNode;
}

const Link = ({ link }: LinkProps) => {
  const { favorites, folderIcons } = useSelector((state: StateType) => state.bookmarks);

  const { title, url, id } = link;
  const cls = "w-12 aspect-square";

  const icon = url ? (
    <Favicon src={url} className={cls} />
  ) : (
    <Icon className={cls} icon={folderIcons?.[id] || "ic:round-folder"} />
  );

  return (
    <div className="icon-2xl flex size-full items-center gap-4 text-xl">
      {icon}
      <div className="truncate text-xl">{title}</div>
      {favorites.includes(id) && (
        <>
          <div className="grow"></div>
          <Icon className="shrink-0 text-2xl" icon="mdi:heart" />
        </>
      )}
    </div>
  );
};

export default BookmarkSearch;

import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { toggleFavorites } from "@/redux/slice/bookmark";
import ContextMenu, { contextMenuProps } from "@/components/contextMenu";
import IconMenu from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";

type AddFavProps = { id: string } & contextMenuProps;

export function LinkContextMenu({ id, ...props }: AddFavProps) {
  const { favorites } = useSelector(
    (state: StateType) => state.bookmarkReducer
  );
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  const fav = favorites.includes(id);
  const toggleFav = () => dispatch(toggleFavorites(id));

  const items = [
    {
      name: fav ? "Remove From Favorites" : "Add To Favorites",
      icon: fav ? "mdi:heart-outline" : "mdi:heart",
      onClick: toggleFav,
    },
    {
      name: delete_,
      icon: "material-symbols:delete",
      onClick: () => chrome.bookmarks.remove(id),
      color: "error.main",
    },
  ];

  return (
    <ContextMenu {...props} menuContent={<IconMenu menuItems={items} />} />
  );
}

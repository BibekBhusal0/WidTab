import { useDispatch, useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { toggleFavorites } from "@/redux/slice/bookmark";
import ContextMenu, { contextMenuProps } from "@/components/contextMenu";
import IconMenu from "@/components/menuWithIcon";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { deleteBookmark } from "@/utils/bookmark";

type AddFavProps = { id: string } & contextMenuProps;

export function LinkContextMenu({ id, ...props }: AddFavProps) {
  const { favorites } = useSelector((state: StateType) => state.bookmarks);
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
      name: "Delete",
      icon: delete_,
      onClick: () => deleteBookmark(id),
      color: "error.main",
    },
  ];

  return (
    <ContextMenu {...props} menuContent={<IconMenu menuItems={items} />} />
  );
}

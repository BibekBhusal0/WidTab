import useCurrentIcons from "@/hooks/useCurrentIcons";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";

export type allItemsListProps = {
  availablePosition?: boolean;
  disabledId?: number[];
  addWidget: (id: number) => void;
  pinned?: number | null;
  items: {
    id: number;
    title: string;
  }[];
};

export function AllItemsList({
  availablePosition = false,
  disabledId = [],
  addWidget,
  pinned,
  items,
}: allItemsListProps) {
  const { pin } = useCurrentIcons();
  return (
    <List>
      {items.map(({ id, title }) => (
        <ListItemButton
          sx={{ justifyContent: "space-between" }}
          disabled={!availablePosition || disabledId.includes(id)}
          key={id}
          onClick={() => addWidget(id)}
          //
        >
          {title}
          {id === pinned && pin}
        </ListItemButton>
      ))}
    </List>
  );
}

export default AllItemsList;

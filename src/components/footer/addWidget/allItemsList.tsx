import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Icon2RN, iconAsProp } from "@/theme/icons";
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
    icon?: iconAsProp;
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
  if (!items.length) return null;
  return (
    <List>
      {items.map(({ id, title, icon }) => (
        <ListItemButton
          sx={{ justifyContent: "space-between" }}
          disabled={!availablePosition || disabledId.includes(id)}
          key={id}
          onClick={() => addWidget(id)}
          //
        >
          {icon ? (
            <div className="flex items-center gap-2">
              <Icon2RN icon={icon} className="h-full" />
              <div>{title}</div>
            </div>
          ) : (
            title
          )}
          {id === pinned && pin}
        </ListItemButton>
      ))}
    </List>
  );
}

export default AllItemsList;

import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/storage/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { SelectChangeEvent } from "@mui/material/Select";
import IconMenu from "@/components/menuWithIcon";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import SelectSize from "@/components/bookmarks/size";
import { allFolderSizes, folderSizes } from "@/types/slice/bookmark";

function Controls({
  id,
  type,
}: {
  id: number;
  type: "favorites" | "top-sites";
}) {
  const layout = useCurrentLayout();
  const { delete_ } = useCurrentIcons();
  if (!layout) return null;
  const { widgets } = layout;
  const widget = widgets.find((w) => w.type === type && w.values.id === id);
  if (!widget || widget.type !== type) return null;
  const props = widget.values;
  const { iconSize = "small" } = props;

  const handleSizeChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as folderSizes;
    if (allFolderSizes.includes(val)) {
      currentSpaceEditWidget({
        type,
        values: { ...props, iconSize: val },
      });
    }
  };

  const deleteThis = () => currentSpaceDeleteWidget({ type, id });

  return (
    <>
      <MenuItem sx={{ justifyContent: "space-between" }} className="gap-2">
        <div className="text-2xl">Size</div>
        <SelectSize
          value={iconSize}
          onChange={handleSizeChange}
          fullWidth
          size="small"
        />
      </MenuItem>
      <Divider />

      <IconMenu
        menuItems={[
          {
            icon: delete_,
            name: "Delete",
            onClick: deleteThis,
            color: "error.main",
          },
        ]}
      />
    </>
  );
}

export default Controls;

import MenuPopover from "@/components/popoverMenu";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { SelectChangeEvent } from "@mui/material/Select";
import IconMenu from "@/components/menuWithIcon";
import MenuSwitch, { MenuSwitchProps } from "@/components/menuSwitch";
import useCurrentLayout from "@/hooks/useCurrentLayout";
import SelectSize from "@/components/bookmarks/size";
import { allFolderSizes, folderSizes } from "@/types/slice/bookmark";
import {
  currentSpaceDeleteWidget,
  currentSpaceEditWidget,
} from "@/storage/layout";

function BookmarkControls({ id }: { id: number }) {
  const layout = useCurrentLayout();
  const { delete_ } = useCurrentIcons();
  if (!layout) return null;
  const { widgets } = layout;
  const widget = widgets.find(
    (w) => w.type === "bookmark" && w.values.id === id
  );
  if (!widget || widget.type !== "bookmark") return null;
  const props = widget.values;
  const { breadcrumb, iconSize, tabs } = props;

  const toggleValue = (type: "breadcrumb" | "tabs") => {
    currentSpaceEditWidget({
      type: "bookmark",
      values: { ...props, [type]: !props[type] },
    });
  };

  const switches: MenuSwitchProps["items"] = [
    {
      onChange: () => toggleValue("breadcrumb"),
      title: "Show breadcrumb",
      checked: breadcrumb,
    },
    { onChange: () => toggleValue("tabs"), title: "Show Tabs", checked: tabs },
  ];

  const handleSizeChange = (event: SelectChangeEvent<unknown>) => {
    const val = event.target.value as folderSizes;
    if (allFolderSizes.includes(val)) {
      currentSpaceEditWidget({
        type: "bookmark",
        values: { ...props, iconSize: val },
      });
    }
  };

  const deleteThis = () => currentSpaceDeleteWidget({ type: "bookmark", id });

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

      <MenuSwitch items={switches} />
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

export default BookmarkControls;

import { Icon2RN, iconAsProp } from "@/icons";
import { StateType } from "@/redux/store";
import { oppositePosition } from "@/types/slice/layout";
import IconButton from "@mui/material/IconButton";
import Popover, { PopoverProps } from "@mui/material/Popover";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import { useSelector } from "react-redux";

function FooterPopover({
  icon = "material-symbols:settings",
  children = <></>,
  tooltip = undefined,
  ...props
}: {
  icon?: iconAsProp;
  children?: JSX.Element;
  tooltip?: string;
} & Partial<PopoverProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = !!anchorEl;
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const { toolBarPosition } = useSelector((state: StateType) => state.layout);

  const handleClose = () => {
    setAnchorEl(null);
  };
  const btn = (
    <IconButton className="text-center overflow-visible" onClick={handleOpen}>
      <Icon2RN icon={icon} />
    </IconButton>
  );

  return (
    <>
      {tooltip ? (
        <Tooltip placement={oppositePosition[toolBarPosition]} title={tooltip}>
          {btn}
        </Tooltip>
      ) : (
        btn
      )}
      <Popover
        marginThreshold={30}
        {...props}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {children}
      </Popover>
    </>
  );
}

export default FooterPopover;

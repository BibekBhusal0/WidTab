import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import { ReactNode } from "react";

export type MenuSwitchProps = {
  items: {
    checked?: boolean;
    onChange: () => void;
    title: ReactNode;
  }[];
};

const MenuSwitch = ({ items }: MenuSwitchProps) => {
  return (
    <>
      {items.map(({ checked, onChange, title }, i) => (
        <MenuItem
          key={i}
          sx={{ justifyContent: "space-between" }}
          onClick={onChange}
          className="capitalize between gap-4 w-full">
          <div className="text-xl">{title}</div>
          <Switch checked={!!checked} onChange={onChange} />
        </MenuItem>
      ))}
    </>
  );
};

export default MenuSwitch;

import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import { ReactNode } from "react";

export type MenuSwitchProps = {
  items: {
    checked?: boolean;
    onChange: () => void;
    title: ReactNode;
  }[];
  plain?: boolean;
};

const MenuSwitch = ({ items, plain = false }: MenuSwitchProps) => {
  return (
    <>
      {items.map(({ checked, onChange, title }, i) => {
        const commonProps = {
          sx: { justifyContent: "space-between" },
          onClick: onChange,
          className: "capitalize between gap-4 w-full cursor-pointer",
          children: (
            <>
              <div className="text-xl">{title}</div>
              <Switch checked={!!checked} />
            </>
          ),
        };

        return plain ? (
          <Box key={i} {...commonProps} />
        ) : (
          <MenuItem key={i} {...commonProps} />
        );
      })}
    </>
  );
};

export default MenuSwitch;

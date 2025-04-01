import { cn } from "@/utils/cn";
import Box, { BoxProps } from "@mui/material/Box";
import { FunctionComponent } from "react";

type SettingHeaderProps = {
  first?: boolean;
} & BoxProps;

const SettingHeader: FunctionComponent<SettingHeaderProps> = ({ first = false, ...props }) => {
  return (
    <Box
      {...props}
      className={cn(
        "pb-3 text-2xl",
        { "border-t-divider mt-2 border-t-2 pt-3": !first },
        props.className
      )}
    />
  );
};

export default SettingHeader;

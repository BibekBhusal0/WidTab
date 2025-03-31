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
        "text-2xl pb-3",
        { "pt-3 mt-2 border-t-2 border-t-divider": !first },
        props.className
      )}
    />
  );
};

export default SettingHeader;

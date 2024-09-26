import { cn } from "@/utils/cn";
import { Box, BoxProps, useTheme } from "@mui/material";
import { FunctionComponent } from "react";

type SettingHeaderProps = {
  first?: boolean;
} & BoxProps;

const SettingHeader: FunctionComponent<SettingHeaderProps> = ({
  first = false,
  ...props
}) => {
  const {
    palette: { divider },
  } = useTheme();
  const style = first ? {} : { borderTop: `2px solid ${divider}` };
  return (
    <Box
      {...props}
      sx={{ ...style, ...props?.sx }}
      className={cn("text-2xl pb-3", { "pt-3 mt-2": !first }, props.className)}
      //
    ></Box>
  );
};

export default SettingHeader;

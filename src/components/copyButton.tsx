import { useState } from "react";
import { iconAsProp, Icon2RN } from "@/theme/icons";
import Button, { ButtonProps } from "@mui/material/Button";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import { cn } from "@/utils/cn";

export type CopyButtonProps = Omit<ButtonProps, "children"> & {
  copyIcon?: iconAsProp;
  copiedIcon?: iconAsProp;
  showTooltip?: boolean;
  tooltipProps?:
  | Partial<TooltipProps>
  | ((copied: boolean) => Partial<TooltipProps>);
  iconCls?: string;
  children: string;
};

export function CopyButton({
  copyIcon = "gravity-ui:copy",
  copiedIcon = "mingcute:check-fill",
  showTooltip = true,
  tooltipProps,
  iconCls,
  ...props
}: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(props.children);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const cls = "size-5 transition-all duration-300 absolute-center";
  const button = (
    <Button
      variant="outlined"
      onClick={copyToClipboard}
      sx={{
        minWidth: "30px",
        padding: "8px 15px",
        border: "1.7px solid",
        ...props.sx,
      }}
      {...props}
    >
      <div className="size-full relative px-0 py-2">
        <Icon2RN
          icon={copyIcon}
          className={cn(cls, copied ? "scale-0" : "scale-100", iconCls)}
        />
        <Icon2RN
          icon={copiedIcon}
          className={cn(cls, copied ? "scale-100" : "scale-0", iconCls)}
        />
      </div>
    </Button>
  );

  if (!showTooltip) return button;

  return (
    <Tooltip
      placement="left"
      title={copied ? "Copied" : "Copy"}
      {...(typeof tooltipProps === "function"
        ? tooltipProps(copied)
        : tooltipProps)}
    >
      {button}
    </Tooltip>
  );
}

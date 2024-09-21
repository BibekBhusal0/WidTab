import React from "react";
import { styled } from "@mui/material/styles";
import tinycolor from "tinycolor2";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { StateType } from "@/redux/store";
import { Paper } from "@mui/material";

const addBackgroundTransparency = (color: string, transparency: number) => {
  return tinycolor(color).setAlpha(transparency).toString();
};

interface WithBackgroundTransparencyProps {
  backgroundColor?: string;
}

const withBackgroundTransparency = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  const ComponentWithTransparency: React.FC<
    P & WithBackgroundTransparencyProps
  > = ({ backgroundColor, ...props }) => {
    const theme = useTheme();
    const { opacity } = useSelector((state: StateType) => state.theme);

    const bgColor = backgroundColor || theme.palette.background.paper;

    const TransparentComponent = styled(WrappedComponent)(() => ({
      backgroundColor: addBackgroundTransparency(bgColor, opacity),
    }));

    return <TransparentComponent {...(props as P)} />;
  };

  return ComponentWithTransparency;
};

export default withBackgroundTransparency;
export const TransparentPaper = withBackgroundTransparency(Paper);

import { alpha } from "@mui/material/styles";

const limitOpacity = (opacity: number) => Math.min(1, Math.max(0, opacity));

function alphaColor(color: string, opacity: number) {
  const _opacity = limitOpacity(opacity);
  return alpha(color, _opacity);
}

export default alphaColor;

import { getBorderRadius } from "@/theme";
import useCurrentTheme from "./useCurrentTheme";

function useCurrentRoundness() {
  const { roundness } = useCurrentTheme();
  const borderRadius = getBorderRadius(roundness);
  return borderRadius;
}

export default useCurrentRoundness;

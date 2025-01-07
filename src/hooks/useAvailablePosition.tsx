import useCurrentLayout from "@/hooks/useCurrentLayout";
import { StateType } from "@/redux/store";
import { findNextAvailablePosition } from "@/utils/findWidgetPosition";
import { useSelector } from "react-redux";

function useAvailablePosition(minW: number = 1, minH: number = 1) {
  const crrLayout = useCurrentLayout();
  const { n_cols, n_rows } = useSelector((state: StateType) => state.layout);
  if (!crrLayout) return null;
  const availablePosition = findNextAvailablePosition(
    crrLayout.widgets,
    n_cols,
    n_rows,
    minW,
    minH
  );

  return availablePosition;
}

export default useAvailablePosition;

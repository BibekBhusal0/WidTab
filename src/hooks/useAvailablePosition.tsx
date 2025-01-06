import useCurrentLayout from "@/hooks/useCurrentLayout";
import { useLayout } from "@/storage";
import { findNextAvailablePosition } from "@/utils/findWidgetPosition";

function useAvailablePosition(minW: number = 1, minH: number = 1) {
  const crrLayout = useCurrentLayout();
  const { n_cols, n_rows } = useLayout();
  if (!crrLayout) return null;
  return findNextAvailablePosition(
    crrLayout.widgets,
    n_cols,
    n_rows,
    minW,
    minH
  );
}

export default useAvailablePosition;

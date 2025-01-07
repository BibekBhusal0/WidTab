import { StateType } from "@/redux/store";
import { useSelector } from "react-redux";

function useCurrentLayout() {
  const { allSpaces, currentSpace } = useSelector(
    (state: StateType) => state.layout
  );
  if (
    allSpaces.length === 0 ||
    !currentSpace ||
    currentSpace.type !== "dynamic"
  ) {
    return null;
  }
  const space = allSpaces.find((p) => p.id === currentSpace.id);
  if (!space) {
    return null;
  }

  return space;
}

export default useCurrentLayout;

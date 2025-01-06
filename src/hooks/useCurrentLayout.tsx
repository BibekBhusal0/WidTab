import { useLayout } from "@/storage";

function useCurrentLayout() {
  const { allSpaces, currentSpace } = useLayout();
  if (
    allSpaces.length === 0 ||
    !currentSpace ||
    currentSpace.type !== "dynamic"
  ) {
    return null;
  }
  const space = allSpaces.find((p) => p.id === currentSpace.id);
  if (!space) return null;

  return space;
}

export default useCurrentLayout;

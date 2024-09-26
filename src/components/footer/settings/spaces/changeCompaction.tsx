import useCurrentLayout from "@/hooks/useCurrentLayout";
import { MenuItem, Select } from "@mui/material";
import { compactionType } from "@/types/slice/layout";
import { useDispatch } from "react-redux";
import { currentSpaceChangeCompaction } from "@/redux/slice/layout";

export function ChangeCompaction({
  showLabel = true,
}: {
  showLabel?: boolean;
}) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  if (!layout) return null;

  const { compaction } = layout;
  const allCompactions: compactionType[] = ["none", "vertical", "horizontal"];
  const selectItem = (
    <Select
      className="w-full capitalize"
      value={compaction}
      onChange={(e) =>
        dispatch(currentSpaceChangeCompaction(e.target.value as compactionType))
      }>
      {allCompactions.map((c) => (
        <MenuItem className="capitalize" key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </Select>
  );
  if (!showLabel) return selectItem;
  return (
    <div className="between gap-5 w-full">
      <div className="text-xl">Compaction</div>
      {selectItem}
    </div>
  );
}

export default ChangeCompaction;

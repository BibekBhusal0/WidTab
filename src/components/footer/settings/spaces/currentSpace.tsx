import useCurrentLayout from "@/hooks/useCurrentLayout";
import { Box, Button, ButtonProps, MenuItem, Select } from "@mui/material";
import { compactionType } from "@/types/slice/layout";
import { useDispatch } from "react-redux";
import {
  currentSpaceChangeCompaction,
  currentSpaceDeleteSpace,
  currentSpaceDuplicate,
} from "@/redux/slice/layout";
import Lock from "../../lock";
import DeleteIcon from "@mui/icons-material/Delete";

function CurrentSpaceSetting() {
  return (
    <Box className="size-full flex flex-col items-center gap-5">
      <ChangeCompaction />
      <div className="between gap-4">
        <div className="text-xl">Lock Widgets</div>
        <Lock type="toggle" />
      </div>
      <DuplicateThisSpace />
      <DeleteThisSpace />
    </Box>
  );
}

export function ChangeCompaction() {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  if (!layout) return null;

  const { compaction } = layout;
  const allCompactions: compactionType[] = ["none", "vertical", "horizontal"];
  return (
    <Select
      className="w-full"
      label="Compaction"
      value={compaction}
      onChange={(e) =>
        dispatch(currentSpaceChangeCompaction(e.target.value as compactionType))
      }>
      {allCompactions.map((c) => (
        <MenuItem key={c} value={c}>
          {c}
        </MenuItem>
      ))}
    </Select>
  );
}

export function DeleteThisSpace(props: ButtonProps) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  if (!layout) return null;
  const { delete_able } = layout;
  if (!delete_able) return null;
  return (
    <Button
      variant="contained"
      color="error"
      children="Delete This Space"
      startIcon={<DeleteIcon />}
      {...props}
      onClick={() => dispatch(currentSpaceDeleteSpace())}
    />
  );
}

export function DuplicateThisSpace(props: ButtonProps) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  if (!layout) return null;
  return (
    <Button
      variant="contained"
      children="Duplicate This Space"
      {...props}
      onClick={() => dispatch(currentSpaceDuplicate())}
    />
  );
}

export default CurrentSpaceSetting;

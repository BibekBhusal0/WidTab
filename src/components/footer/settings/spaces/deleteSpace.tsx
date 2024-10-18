import useCurrentLayout from "@/hooks/useCurrentLayout";
import Button, { ButtonProps } from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { currentSpaceDeleteSpace } from "@/redux/slice/layout";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default DeleteThisSpace;

import useCurrentLayout from "@/hooks/useCurrentLayout";
import Button, { ButtonProps } from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { deleteSpace } from "@/redux/slice/layout";
import useCurrentIcons from "@/hooks/useCurrentIcons";

export function DeleteThisSpace(props: ButtonProps) {
  const layout = useCurrentLayout();
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  if (!layout) return null;
  const { delete_able } = layout;
  if (!delete_able) return null;
  return (
    <Button
      variant="text"
      color="error"
      children="Delete This Space"
      startIcon={delete_}
      {...props}
      onClick={() => dispatch(deleteSpace(layout.id))}
    />
  );
}

export default DeleteThisSpace;

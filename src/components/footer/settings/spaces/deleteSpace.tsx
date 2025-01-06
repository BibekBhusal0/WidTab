import useCurrentLayout from "@/hooks/useCurrentLayout";
import Button, { ButtonProps } from "@mui/material/Button";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { deleteSpace } from "@/storage/layout";

export function DeleteThisSpace(props: ButtonProps) {
  const layout = useCurrentLayout();
  const { delete_ } = useCurrentIcons();
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
      onClick={() => deleteSpace(layout.id)}
    />
  );
}

export default DeleteThisSpace;

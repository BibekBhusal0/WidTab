import useCurrentLayout from "@/hooks/useCurrentLayout";
import { duplicateSpace } from "@/storage/layout";
import Button, { ButtonProps } from "@mui/material/Button";

export function DuplicateThisSpace(props: ButtonProps) {
  const layout = useCurrentLayout();
  if (!layout) return null;
  return (
    <Button
      variant="contained"
      children="Duplicate This Space"
      {...props}
      onClick={() => duplicateSpace(layout.id)}
    />
  );
}

export default DuplicateThisSpace;

import useCurrentLayout from "@/hooks/useCurrentLayout";
import Button, { ButtonProps } from "@mui/material/Button";
import { useDispatch } from "react-redux";
import { duplicateSpace } from "@/redux/slice/layout";

export function DuplicateThisSpace(props: ButtonProps) {
  const layout = useCurrentLayout();
  const dispatch = useDispatch();
  if (!layout) return null;
  return (
    <Button
      variant="contained"
      children="Duplicate This Space"
      {...props}
      onClick={() => dispatch(duplicateSpace(layout.id))}
    />
  );
}

export default DuplicateThisSpace;

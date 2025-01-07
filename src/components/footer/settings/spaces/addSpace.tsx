import AddItem from "@/components/addItem";
import { addSpace } from "@/redux/slice/layout";
import { useDispatch } from "react-redux";

function AddSpace() {
  const dispatch = useDispatch();
  const handleClick = (e: string) => {
    dispatch(addSpace(e));
  };
  return (
    <AddItem
      word_limit={20}
      addButtonProps={{ children: "Add Space", variant: "contained" }}
      inputProps={{ label: "Space Name" }}
      clickEvent={handleClick}
    />
  );
}

export default AddSpace;

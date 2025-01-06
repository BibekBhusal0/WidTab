import AddItem from "@/components/addItem";
import { addSpace } from "@/storage/layout";

function AddSpace() {
  const handleClick = (e: string) => {
    addSpace(e);
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

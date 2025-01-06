import useCurrentTheme from "@/hooks/useCurrentTheme";
import AddItem from "@/components/addItem";
import { addTheme } from "@/storage/theme";

function AddTheme() {
  const crrTheme = useCurrentTheme();

  const handleClick = (text: string) => {
    addTheme({
      ...crrTheme,
      name: text,
      id: 0,
      editAble: true,
    });
  };
  return (
    <AddItem
      clickEvent={handleClick}
      addButtonProps={{ children: "Add Theme" }}
      inputProps={{ label: "Theme Name" }}
      word_limit={20}
    />
  );
}

export default AddTheme;

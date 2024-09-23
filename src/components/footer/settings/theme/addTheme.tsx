import useCurrentTheme from "@/hooks/useCurrentTheme";
import { useDispatch } from "react-redux";
import { addTheme } from "@/redux/slice/theme";
import { v4 as uuidv4 } from "uuid";
import AddItem from "@/components/addItem";

function AddTheme() {
  const crrTheme = useCurrentTheme();
  const dispatch = useDispatch();

  const handleClick = (text: string) => {
    dispatch(
      addTheme({
        ...crrTheme,
        name: text,
        id: uuidv4(),
        editAble: true,
      })
    );
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

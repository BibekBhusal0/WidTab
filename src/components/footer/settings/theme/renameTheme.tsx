import useCurrentTheme from "@/hooks/useCurrentTheme";
import { changeTheme } from "@/redux/slice/theme";

import { useDispatch } from "react-redux";
import RenameItem from "@/components/renameItem";

function RenameTheme() {
  const theme = useCurrentTheme();
  const dispatch = useDispatch();
  const handleChange = (e: string) => dispatch(changeTheme({ ...theme, name: e }));

  return (
    <div className="full-between">
      <div className="text-xl">Theme Name</div>
      <RenameItem
        handleChange={handleChange}
        initialText={theme.name}
        wordLimit={20}
        inputProps={{ placeholder: "Rename Theme" }}
      />
    </div>
  );
}

export default RenameTheme;

import useCurrentTheme from "@/hooks/useCurrentTheme";
import RenameItem from "@/components/renameItem";
import { changeTheme } from "@/storage/theme";

function RenameTheme() {
  const theme = useCurrentTheme();
  const handleChange = (e: string) => changeTheme({ ...theme, name: e });

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

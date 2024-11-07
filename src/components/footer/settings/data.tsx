import { resetBookmarkState } from "@/redux/slice/bookmark";
import { resetHabitTrackerState } from "@/redux/slice/habit-tracker";
import { resetLayoutState } from "@/redux/slice/layout";
import { resetNoteState } from "@/redux/slice/note";
import { resetThemeSlice } from "@/redux/slice/theme";
import { resetTodoSlice } from "@/redux/slice/todo";
import { exportStateToJSON, importStateFromJSON } from "@/utils/redux";
import Button from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const DataSettings = () => {
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
    }
  };

  const handleImportClick = () => {
    if (!file) return;
    if (file.type !== "application/json") return;
    importStateFromJSON(file);
  };

  const handleExportClick = () => {
    exportStateToJSON();
  };

  const handelReset = () => {
    dispatch(resetNoteState());
    dispatch(resetHabitTrackerState());
    dispatch(resetBookmarkState());
    dispatch(resetLayoutState());
    dispatch(resetThemeSlice());
    dispatch(resetTodoSlice());
  };

  return (
    <div className="size-full flex-center flex-col gap-4">
      <input type="file" onChange={handleFileChange} />
      <Button onClick={handleImportClick}>Import</Button>
      <Button onClick={handleExportClick}>Export</Button>
      <Button onClick={handelReset}>Reset</Button>
    </div>
  );
};

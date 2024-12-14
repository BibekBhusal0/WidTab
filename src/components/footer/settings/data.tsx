import useCurrentIcons from "@/hooks/useCurrentIcons";
import { resetBookmarkState } from "@/redux/slice/bookmark";
import { resetHabitTrackerState } from "@/redux/slice/habit-tracker";
import { resetLayoutState } from "@/redux/slice/layout";
import { resetNoteState } from "@/redux/slice/note";
import { resetThemeSlice } from "@/redux/slice/theme";
import { resetTodoSlice } from "@/redux/slice/todo";
import { Icon2RN } from "@/theme/icons";
import { cn } from "@/utils/cn";
import { exportStateToJSON, importStateFromJSON } from "@/utils/redux";
import Button, { ButtonProps } from "@mui/material/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";

export const DataSettings = () => {
  const { reset } = useCurrentIcons();
  const [file, setFile] = useState<File | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setFile(file);
    }
  };

  const handleRestore = () => {
    if (!file) return;
    if (file.type !== "application/json") return;
    importStateFromJSON(file);
    setFile(null);
  };

  const handleBackup = () => exportStateToJSON();

  const handelReset = () => {
    dispatch(resetNoteState());
    dispatch(resetHabitTrackerState());
    dispatch(resetBookmarkState());
    dispatch(resetLayoutState());
    dispatch(resetThemeSlice());
    dispatch(resetTodoSlice());
  };

  const commonProps: ButtonProps = {
    size: "large",
    variant: "contained",
    className: "text-xl",
  };
  const Buttons: ButtonProps[] = [
    {
      startIcon: <Icon2RN icon="ic:baseline-restore" />,
      onClick: handleRestore,
      children: "Restore",
    },
    {
      startIcon: <Icon2RN icon="mdi:backup-outline" />,
      onClick: handleBackup,
      children: "Backup",
    },
    {
      startIcon: <Icon2RN icon={reset} />,
      onClick: handelReset,
      children: "Reset",
      variant: "text",
      color: "error",
    },
  ];
  return (
    <div className="size-full flex-center flex-col gap-5 icon-xl">
      <input type="file" onChange={handleFileChange} />
      {Buttons.map((props, index) => (
        <Button
          key={index}
          {...commonProps}
          {...props}
          className={cn(commonProps.className, props.className)}
        />
      ))}
    </div>
  );
};

import { useTost } from "@/components/tost";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { resetBookmarkState } from "@/redux/slice/bookmark";
import { resetHabitTrackerState } from "@/redux/slice/habit-tracker";
import { resetLayoutState } from "@/redux/slice/layout";
import { resetNoteState } from "@/redux/slice/note";
import { resetThemeSlice } from "@/redux/slice/theme";
import { resetTodoSlice } from "@/redux/slice/todo";
import { Icon2RN } from "@/theme/icons";
import { cn } from "@/utils/cn";
import { removeAllImagesFromStorage } from "@/utils/image";
import { exportStateToJSON, importStateFromJSON } from "@/utils/redux";
import Button, { ButtonProps } from "@mui/material/Button";
import { useRef } from "react";
import { useDispatch } from "react-redux";

export const DataSettings = () => {
  const { reset } = useCurrentIcons();
  const { showTost } = useTost();
  const fileRef = useRef<HTMLInputElement | null>(null);
  const dispatch = useDispatch();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (!file) return;
    if (file.type !== "application/json") return;
    importStateFromJSON(file);
  };

  const handleRestore = () => fileRef.current?.click();
  const handleBackup = () => {
    exportStateToJSON();
    showTost({ children: "Data Backed Up Sucessfully", severity: "success" });
  };

  const handelReset = () => {
    dispatch(resetNoteState());
    dispatch(resetHabitTrackerState());
    dispatch(resetBookmarkState());
    dispatch(resetLayoutState());
    dispatch(resetThemeSlice());
    dispatch(resetTodoSlice());
    removeAllImagesFromStorage();
    showTost({ children: "Data Reset Sucessfully", severity: "success" });
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
      <input
        type="file"
        accept=".json"
        onChange={handleFileChange}
        hidden
        ref={fileRef}
      />
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

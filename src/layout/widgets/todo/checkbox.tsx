import { sortableCheckboxProps } from "@/types/slice/todo";
import { useEffect, useRef } from "react";
import { transparentInput } from "./index";
import Checkbox from "@mui/material/Checkbox";
import { Icon } from "@iconify/react";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { SortableDragHandle, SortableItem } from "@/components/sortable";

function SortableCheckbox({
  id,
  task,
  checked,
  handleDelete,
  handleChange,
  handleToggle,
  addTodo = () => {},
  ref_ = () => ({}),
  focusPrevious = () => {},
  focusNext = () => {},
}: sortableCheckboxProps) {
  const { delete_ } = useCurrentIcons();
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (ref_ && ref.current) ref_(ref.current);
  }, [ref_, ref]);

  useEffect(() => {
    const fixHeight = () => {
      if (ref.current) {
        ref.current.style.height = "auto";
        ref.current.style.height = `${ref.current.scrollHeight}px`;
      }
    };

    const observer = new ResizeObserver(fixHeight);
    if (ref.current) observer.observe(ref.current);
    fixHeight();

    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, [task]);

  return (
    <SortableItem
      className="flex align-center group items-start justify-center gap-2"
      asChild={false}
      value={id}>
      <div className="w-8 h-full">
        <SortableDragHandle className="opacity-45 cursor-grab focus:cursor-grabbing hidden group-hover:block m-0 p-0">
          <Icon className="text-2xl" icon="material-symbols:drag-indicator" />
        </SortableDragHandle>
      </div>
      <Checkbox checked={checked} sx={{ padding: 0 }} onChange={handleToggle} />
      <textarea
        ref={ref}
        placeholder="New Todo"
        value={task}
        autoFocus={task.trim() === ""}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={(e) => {
          if (
            (e.key === "Backspace" || e.key === "Delete") &&
            task.trim() === ""
          ) {
            e.preventDefault();
            handleDelete();
            setTimeout(() => focusPrevious(), 100);
          } else if (["ArrowUp", "Enter", "ArrowDown", "Tab"].includes(e.key)) {
            e.preventDefault();
            if (e.key === "Enter" || e.key === "Tab") addTodo();
            else if (e.key === "ArrowUp") focusPrevious();
            else if (e.key === "ArrowDown") focusNext();
          }
        }}
        className={`${transparentInput} text-lg`}
        rows={1}
      />
      <div className="w-8 h-full">
        <button
          className="h-full hidden group-hover:block icon-md text-error-main"
          onClick={handleDelete}
          //
        >
          {delete_}
        </button>
      </div>
    </SortableItem>
  );
}

export default SortableCheckbox;

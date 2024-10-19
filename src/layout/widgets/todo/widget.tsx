import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from ".";
import { controlledWidgetValues } from "@/types/slice/widgets";
import { currentSpaceDeleteWidget } from "@/redux/slice/layout";
import IconButton from "@mui/material/IconButton";

import { useState } from "react";
import useCurrentIcons from "@/hooks/useCurrentIcons";

function TodoWidget({ id }: controlledWidgetValues) {
  const { delete_ } = useCurrentIcons();
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);
  const { Tasks } = useSelector((state: StateType) => state.todo);
  const deleteAction = () =>
    dispatch(currentSpaceDeleteWidget({ id, type: "todo" }));

  const task = Tasks.find((p) => p.id === id);
  if (!task)
    return (
      <div className="flex flex-col py-5 items-center gap-4 size-full">
        <div className="text-xl">Todo List not found</div>
        <IconButton onClick={deleteAction} color="error">
          {delete_}
        </IconButton>
      </div>
    );
  return (
    <div
      className="size-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Todo {...task} deleteAction={deleteAction} showControls={isHovered} />
    </div>
  );
}

export default TodoWidget;

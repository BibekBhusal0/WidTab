import { StateType } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../widgets/todo";
import Paper from "@mui/material/Paper";
import { addTask, reorderTodos } from "@/redux/slice/todo";
import { cn } from "@/utils/cn";
import useCurrentIcons from "@/hooks/useCurrentIcons";
import { Sortable, SortableDragHandle, SortableItem } from "@/components/sortable";
import Controls from "../widgets/controls";
import { getWidgetControlsProps } from "@/utils/getWidget";
import { ScrollArea } from "@/components/scrollarea";

function TodoPage() {
  const { add } = useCurrentIcons();
  const { Tasks, pinnedTodo } = useSelector((state: StateType) => state.todo);
  const dispatch = useDispatch();
  const commonCls = "h-80 overflow-hidden";

  return (
    <ScrollArea className="size-full">
      <Sortable value={Tasks} onValueChange={(n) => dispatch(reorderTodos(n))} orientation="mixed">
        <div className="grid gap-3 grid-cols-1 p-3 sm:grid-cols-2 md:grid-cols-3">
          {Tasks.map((task) => (
            <SortableItem key={task.id} value={task.id}>
              <Paper
                sx={{
                  backgroundColor:
                    task.id === pinnedTodo ? "primaryContainer.paper" : "secondaryContainer.paper",
                }}
                className={commonCls}>
                <Controls
                  className="pt-1"
                  {...getWidgetControlsProps("todo", task.id)}
                  showOn="always">
                  <SortableDragHandle className="absolute w-full h-3 bg-primary-2 top-0 z-10" />
                  <Todo {...task} />
                </Controls>
              </Paper>
            </SortableItem>
          ))}
          <Paper
            sx={{
              backgroundColor: "secondaryContainer.paper",
            }}
            onClick={() => dispatch(addTask(""))}
            className={cn(commonCls, "flex-center group cursor-pointer")}>
            <div className="group-hover:scale-600 scale-300 transition-all">{add}</div>
          </Paper>
        </div>
      </Sortable>
    </ScrollArea>
  );
}

export default TodoPage;

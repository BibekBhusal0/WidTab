import { todoStateType, todoType } from "@/types/slice/todo";
import { getNextId } from "@/utils/next_id";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialTodoState } from "./initialStates";

export const todoSlice = createSlice({
  name: "todo",
  initialState: { ...initialTodoState },
  reducers: {
    addTask: (state, action: PayloadAction<string>) => {
      state.Tasks.push({
        filtered: false,
        id: getNextId(state.Tasks.map(({ id }) => id)),
        title: action.payload,
        todos: [],
        icon: "fluent:task-list-square-16-filled",
      });
    },

    deleteTask: (state, action: PayloadAction<number>) => {
      state.Tasks = state.Tasks.filter((p) => p.id !== action.payload);
      if (state.pinnedTodo === action.payload) {
        state.pinnedTodo = null;
      }
    },

    changeTaskIcon(
      state,
      action: PayloadAction<{ task_id: number; icon: string }>
    ) {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) task.icon = action.payload.icon;
    },
    changeTaskTitle(
      state,
      action: PayloadAction<{ task_id: number; title: string }>
    ) {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) task.title = action.payload.title;
    },
    changeTaskTodos(
      state,
      action: PayloadAction<{ task_id: number; todo: todoType[] }>
    ) {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) {
        if (task.filtered) {
          task.todos = [
            ...action.payload.todo,
            ...task.todos.filter((a) => a.checked),
          ];
        } else task.todos = action.payload.todo;
      }
    },

    toggleFiltered: (state, action: PayloadAction<{ id: number }>) => {
      const task = state.Tasks.find((p) => p.id === action.payload.id);
      if (task) {
        task.filtered = !task.filtered;
      }
    },
    changePinnedTodo: (state, action: PayloadAction<number>) => {
      if (state.pinnedTodo === action.payload) state.pinnedTodo = null;
      else state.pinnedTodo = action.payload;
    },
    resetTodoSlice: (state) => Object.assign(state, initialTodoState),
    setState: (
      state,
      action: PayloadAction<{ value: todoStateType; check?: boolean }>
    ) => {
      const { value, check = true } = action.payload;
      const val = value;
      if (!val) return;
      if (!val.Tasks) return;
      if (!Array.isArray(val.Tasks)) return;
      if (!check) return Object.assign(state, value);
      const tasks = state.Tasks;
      val.Tasks.forEach((task) => {
        const t = tasks.find((p) => p.id === task.id && p.title === task.title);
        if (t) Object.assign(t, task);
        else {
          const id = getNextId(tasks.map(({ id }) => id));
          if (task.id === val.pinnedTodo) state.pinnedTodo = id;
          tasks.push({ ...task, id });
        }
      });
      state.Tasks = tasks;
    },
  },
});

export const {
  addTask,
  deleteTask,
  toggleFiltered,
  changePinnedTodo,
  resetTodoSlice,
  setState,
  changeTaskIcon,
  changeTaskTitle,
  changeTaskTodos,
} = todoSlice.actions;
export default todoSlice.reducer;

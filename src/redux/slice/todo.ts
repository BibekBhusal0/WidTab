import { changeTaskType, TaskType, todoStateType } from "@/types/slice/todo";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: todoStateType = {
  Tasks: [
    {
      sorted: false,
      filtered: false,
      id: 1,
      title: "All Tasks",
      todos: [
        { id: 1, task: "Task 1", checked: true },
        { id: 2, task: "Task 2", checked: false },
      ],
    },
    {
      sorted: false,
      id: 2,
      filtered: false,
      title: "Today",
      todos: [{ id: 3, task: "Task 3", checked: false }],
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ title: string }>) => {
      state.Tasks.push({
        filtered: false,
        sorted: false,
        id: getNextId(state.Tasks.map(({ id }) => id)),
        title: action.payload.title,
        todos: [],
      });
    },
    setTasks: (state, action: PayloadAction<TaskType[]>) => {
      const existingTasksMap = new Map<number, TaskType>(
        state.Tasks.map((p) => [p.id, p])
      );
      action.payload.forEach((task) => {
        existingTasksMap.set(task.id, task);
      });
      state.Tasks = Array.from(existingTasksMap.values());
    },
    addTodo: (
      state,
      action: PayloadAction<{ task_id: number; task: string }>
    ) => {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) {
        task.todos.push({
          id: getNextId(task.todos.map(({ id }) => id)),
          task: action.payload.task,
          checked: false,
        });
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      state.Tasks = state.Tasks.filter((p) => p.id !== action.payload);
    },
    deleteTodo: (
      state,
      action: PayloadAction<{ task_id: number; todo_id: number }>
    ) => {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) {
        task.todos = task.todos.filter((t) => t.id !== action.payload.todo_id);
      }
    },
    changeTask(state, action: PayloadAction<changeTaskType>) {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) {
        if (action.payload.change_item === "todo") {
          if (task.filtered) {
            task.todos = [
              ...action.payload.todo,
              ...task.todos.filter((a) => a.checked),
            ];
          } else {
            task.todos = action.payload.todo;
          }
          task.sorted = false;
        } else {
          task.title = action.payload.title;
        }
      }
    },
    changeTodo(
      state,
      action: PayloadAction<{
        task_id: number;
        todo_id: number;
        task: string;
      }>
    ) {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) {
        const todo = task.todos.find((t) => t.id === action.payload.todo_id);
        if (todo) {
          todo.task = action.payload.task;
        }
      }
    },
    toggleTodo(
      state,
      action: PayloadAction<{ task_id: number; todo_id: number }>
    ) {
      const task = state.Tasks.find((p) => p.id === action.payload.task_id);
      if (task) {
        const todo = task.todos.find((t) => t.id === action.payload.todo_id);
        if (todo) {
          todo.checked = !todo.checked;
        }
      }
    },
    toggleSortedFiltered: (
      state,
      action: PayloadAction<{ id: number; type: "sorted" | "filtered" }>
    ) => {
      const task = state.Tasks.find((p) => p.id === action.payload.id);
      if (task) {
        task[action.payload.type] = !task[action.payload.type];
        if (action.payload.type === "sorted") task.filtered = false;
        if (action.payload.type === "filtered") task.sorted = false;
      }
    },
  },
});

export const {
  addTask,
  addTodo,
  deleteTask,
  deleteTodo,
  changeTask,
  changeTodo,
  toggleTodo,
  toggleSortedFiltered,
  setTasks,
} = todoSlice.actions;
export default todoSlice.reducer;

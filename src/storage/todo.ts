import { getFromStorage, setInStorage, STORAGE_KEYS } from "./";
import { getNextId } from "@/utils/next_id";
import {
  todoStateType,
  TaskType,
  TaskTodoID,
  changeTaskType,
  todoType,
} from "@/types/slice/todo";
import { initialTodoState } from "./initialStates";

const TODO_STORAGE_KEY = STORAGE_KEYS.todo;

export const getTodoState = async () => {
  return (
    ((await getFromStorage(TODO_STORAGE_KEY)) as todoStateType) || {
      Tasks: [],
      pinnedTodo: null,
    }
  );
};

export async function getTask(task_id: number) {
  const state = await getTodoState();
  return state.Tasks.find((p) => p.id === task_id);
}
export async function setTasks(tasks: TaskType[]) {
  const state = await getTodoState();
  setInStorage(TODO_STORAGE_KEY, { ...state, Tasks: tasks });
}
export async function addTodo(task_id: number, todo: string) {
  const state = await getTodoState();
  const t = await getTask(task_id);
  if (t) {
    const newTask = {
      id: getNextId(t.todos.map(({ id }) => id)),
      task: todo,
      checked: false,
    };
    setInStorage(TODO_STORAGE_KEY, {
      ...state,
      Tasks: state.Tasks.map((p) =>
        p.id === task_id ? { ...p, todos: [...p.todos, newTask] } : p
      ),
    });
  }
}

export async function deleteTodo({ task_id, todo_id }: TaskTodoID) {
  const state = await getTodoState();
  const newState: todoStateType = {
    ...state,
    Tasks: state.Tasks.map((p) =>
      p.id === task_id
        ? { ...p, todos: p.todos.filter((t) => t.id !== todo_id) }
        : p
    ),
  };
  setInStorage(TODO_STORAGE_KEY, newState);
}
export async function changeTask({ task_id, change_item }: changeTaskType) {
  const state = await getTodoState();
  const task = await getTask(task_id);
  if (!task) return;
  const newTask = { ...task };
  if (change_item === "todo") {
    if (task.filtered) {
      newTask.todos = [...task.todos, ...task.todos.filter((a) => a.checked)];
    } else {
      newTask.todos = task.todos;
    }
    task.sorted = false;
  } else if (change_item === "title") newTask.title = task.title;
  else if (change_item === "icon") newTask.icon = task.icon;
  const newState: todoStateType = {
    ...state,
    Tasks: state.Tasks.map((p) => (p.id === task_id ? newTask : p)),
  };
  setInStorage(TODO_STORAGE_KEY, newState);
}
export async function changeTodo({
  task_id,
  todo_id,
  task,
}: TaskTodoID & { task: string }) {
  const state = await getTodoState();
  const _task = await getTask(task_id);
  if (!_task) return;
  const todo = _task.todos.find((t) => t.id === todo_id);
  if (!todo) return;
  const newTodo: todoType = { ...todo, task };
  const newState: todoStateType = {
    ...state,
    Tasks: state.Tasks.map((p) =>
      p.id === task_id
        ? {
            ...p,
            todos: p.todos.map((t) => (t.id === todo_id ? newTodo : t)),
          }
        : p
    ),
  };
  setInStorage(TODO_STORAGE_KEY, newState);
}
export async function toggleTodo({ task_id, todo_id }: TaskTodoID) {
  const state = await getTodoState();
  const newState: todoStateType = {
    ...state,
    Tasks: state.Tasks.map((p) =>
      p.id === task_id
        ? {
            ...p,
            todos: p.todos.map((t) =>
              t.id === todo_id ? { ...t, checked: !t.checked } : t
            ),
          }
        : p
    ),
  };
  setInStorage(TODO_STORAGE_KEY, newState);
}
export async function toggleSortedFiltered({
  id,
  type,
}: {
  id: number;
  type: "sorted" | "filtered";
}) {
  const state = await getTodoState();
  const newState: todoStateType = {
    ...state,
    Tasks: state.Tasks.map((p) =>
      p.id === id ? { ...p, [type]: !p[type] } : p
    ),
  };
  setInStorage(TODO_STORAGE_KEY, newState);
}
export async function changePinnedTodo(task_id: number) {
  const state = await getTodoState();
  const newState: todoStateType = { ...state, pinnedTodo: task_id };
  setInStorage(TODO_STORAGE_KEY, newState);
}
export function fixState(state: todoStateType) {
  const newState: todoStateType = { Tasks: [], pinnedTodo: null };

  if (!state || !state.Tasks) return;
  if (!Array.isArray(state.Tasks)) return;
  const tasks = newState.Tasks;

  state.Tasks.forEach((task) => {
    const t = tasks.find((p) => p.id === task.id && p.title === task.title);
    if (t) Object.assign(t, task);
    else {
      const id = getNextId(tasks.map(({ id }) => id));
      if (task.id === state.pinnedTodo) newState.pinnedTodo = id;
      tasks.push({ ...task, id });
    }
  });
  newState.Tasks = tasks;
  return newState;
}
export function setTodoState(state: todoStateType) {
  const newState = fixState(state);
  if (newState) setInStorage(TODO_STORAGE_KEY, newState);
}
export function resetTodo() {
  setInStorage(TODO_STORAGE_KEY, initialTodoState);
}

export const addTask = async (title: string) => {
  const currentState = await getTodoState();
  const newId = getNextId(currentState.Tasks.map(({ id }) => id));
  const newTask: TaskType = {
    filtered: false,
    sorted: false,
    id: newId,
    title: title,
    todos: [],
    icon: "fluent:task-list-square-16-filled",
  };

  const newState = {
    ...currentState,
    Tasks: [...currentState.Tasks, newTask],
  };
  await setInStorage(TODO_STORAGE_KEY, newState);
};

export const deleteTask = async (task_id: number) => {
  const currentState = await getTodoState();
  const newState: todoStateType = {
    ...currentState,
    Tasks: currentState.Tasks.filter((p) => p.id !== task_id),
  };
  if (currentState.pinnedTodo === task_id) newState.pinnedTodo = null;
  await setInStorage(TODO_STORAGE_KEY, newState);
};

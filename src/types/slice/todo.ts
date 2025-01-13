export interface todoType {
  id: number;
  task: string;
  checked: boolean;
}

export interface TaskType {
  id: number;
  filtered?: boolean;
  icon: string;
  title: string;
  todos: todoType[];
}

export interface todoStateType {
  Tasks: TaskType[];
  pinnedTodo: null | number;
}

export type TaskTodoID = { task_id: number; todo_id: number };

export type changeTaskType =
  | { task_id: number; change_item: "todo"; todo: todoType[] }
  | { task_id: number; change_item: "title"; title: string }
  | { task_id: number; change_item: "icon"; icon: string };

export type sortableCheckboxProps = todoType & {
  handleChange: (val: string) => void;
  handleDelete: () => void;
  handleToggle: () => void;
  addTodo?: () => void;
  ref_?: (el: HTMLTextAreaElement | null) => {};
  focusPrevious?: () => void;
  focusNext?: () => void;
};

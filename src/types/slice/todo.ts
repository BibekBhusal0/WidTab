export interface todoType {
  id: string;
  task: string;
  checked: boolean;
}

export interface TaskType {
  id: string;
  sorted?: boolean;
  filtered?: boolean;

  title: string;
  todos: todoType[];
}

export interface todoStateType {
  Tasks: TaskType[];
}

export type changeTaskType =
  | { task_id: string; change_item: "todo"; todo: todoType[] }
  | { task_id: string; change_item: "title"; title: string };

export type sortableCheckboxProps = todoType & {
  handleChange: (val: string) => void;
  handleDelete: () => void;
  handleToggle: () => void;
  addTodo?: () => void;
  ref_?: (el: HTMLTextAreaElement | null) => {};
  focusPrevious?: () => void;
  focusNext?: () => void;
};

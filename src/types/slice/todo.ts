export interface todoType {
  id: number;
  task: string;
  checked: boolean;
}

export interface TaskType {
  id: number;
  sorted?: boolean;
  filtered?: boolean;

  title: string;
  todos: todoType[];
}

export interface todoStateType {
  Tasks: TaskType[];
}

export type changeTaskType =
  | { task_id: number; change_item: "todo"; todo: todoType[] }
  | { task_id: number; change_item: "title"; title: string };

export type sortableCheckboxProps = todoType & {
  handleChange: (val: string) => void;
  handleDelete: () => void;
  handleToggle: () => void;
  addTodo?: () => void;
  ref_?: (el: HTMLTextAreaElement | null) => {};
  focusPrevious?: () => void;
  focusNext?: () => void;
};
export type todoMenuProps = {
  handleDelete?: () => void;
  handleSort?: () => void;
  handleFilter?: () => void;
  sorted?: boolean;
  filtered?: boolean;
};

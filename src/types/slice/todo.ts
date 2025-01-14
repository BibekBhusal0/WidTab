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

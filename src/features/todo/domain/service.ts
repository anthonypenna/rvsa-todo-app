import type { AddTodoDto, DeleteTodoDto } from "@/features/todo/domain/dtos";
import type { Todo } from "@/features/todo/domain/entities";

export interface TodoService {
  getTodos(): Todo[];
  addTodo(todo: AddTodoDto): void;
  deleteTodo(todo: DeleteTodoDto): void;
}

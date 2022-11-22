import type { AddTodoDto, DeleteTodoDto } from "@/features/todo/domain/dtos";
import type { Todo } from "@/features/todo/domain/entities";

export interface TodoRepository {
  selectAll(): Todo[];
  insertOne(todo: AddTodoDto): void;
  deleteOne(todo: DeleteTodoDto): void;
}

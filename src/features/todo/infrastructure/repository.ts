import type { AddTodoDto, DeleteTodoDto } from "@/features/todo/domain/dtos";
import type { Todo } from "@/features/todo/domain/entities";
import type { TodoRepository } from "@/features/todo/domain/repository";

export class TodoRepositoryImpl implements TodoRepository {
  constructor(private todos: Todo[], private createId: () => string) {}

  deleteOne(todo: DeleteTodoDto): void {
    const todoIndex = this.todos.findIndex(({ id }) => id === todo.id);
    this.todos.splice(todoIndex, 1);
  }

  insertOne(todo: AddTodoDto): void {
    this.todos.push({ id: this.createId(), name: todo.name });
  }

  selectAll(): Todo[] {
    return [...this.todos];
  }
}

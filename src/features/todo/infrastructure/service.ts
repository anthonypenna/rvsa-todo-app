import type { AddTodoDto, DeleteTodoDto } from "@/features/todo/domain/dtos";
import type { Todo } from "@/features/todo/domain/entities";
import type { TodoRepository } from "@/features/todo/domain/repository";
import type { TodoService } from "@/features/todo/domain/service";

export class TodoServiceImpl implements TodoService {
  constructor(private todoRepository: TodoRepository) {}

  addTodo(todo: AddTodoDto): void {
    this.todoRepository.insertOne(todo);
  }

  deleteTodo(todo: DeleteTodoDto): void {
    this.todoRepository.deleteOne(todo);
  }

  getTodos(): Todo[] {
    return this.todoRepository.selectAll();
  }
}

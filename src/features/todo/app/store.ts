import type { DeleteTodoDto } from "@/features/todo/domain/dtos";
import type { Todo } from "@/features/todo/domain/entities";
import type { TodoService } from "@/features/todo/domain/service";
import { TodoRepositoryImpl } from "@/features/todo/infrastructure/repository";
import { TodoServiceImpl } from "@/features/todo/infrastructure/service";
import { BehaviorSubject } from "rxjs";

export class TodoStore {
  todoName$: BehaviorSubject<string>;
  todos$: BehaviorSubject<Todo[]>;

  constructor(private todoService: TodoService) {
    this.todoName$ = new BehaviorSubject("");
    this.todos$ = new BehaviorSubject(this.todoService.getTodos());
  }

  addTodo() {
    this.todoService.addTodo({ name: this.todoName$.value });
    this.todoName$.next("");
    this.todos$.next(this.todoService.getTodos());
  }

  deleteTodo(todo: DeleteTodoDto) {
    this.todoService.deleteTodo(todo);
    this.todos$.next(this.todoService.getTodos());
  }
}

const todoRepository = new TodoRepositoryImpl([], () => crypto.randomUUID());
const todoService = new TodoServiceImpl(todoRepository);
export const todoStore = new TodoStore(todoService);

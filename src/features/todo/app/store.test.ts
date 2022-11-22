import type { Todo } from "@/features/todo/domain/entities";
import { TodoRepositoryImpl } from "@/features/todo/infrastructure/repository";
import { TodoServiceImpl } from "@/features/todo/infrastructure/service";
import { TodoStore } from "@/features/todo/app/store";
import { describe, expect, it } from "vitest";

describe("TodoStore", () => {
  it("starts with the correct state", () => {
    const todos: Todo[] = [];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    const service = new TodoServiceImpl(repository);
    const store = new TodoStore(service);
    expect(store.todoName$.value).toEqual<string>("");
    expect(store.todos$.value).toEqual<Todo[]>(todos);
  });

  it("adds a todo", () => {
    const todos: Todo[] = [];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    const service = new TodoServiceImpl(repository);
    const store = new TodoStore(service);
    store.todoName$.next("hello");
    store.addTodo();
    expect(store.todoName$.value).toEqual<string>("");
    expect(store.todos$.value).toEqual<Todo[]>([{ id: "xxxx", name: "hello" }]);
  });

  it("deletes a todo", () => {
    const todos: Todo[] = [{ id: "xxxx", name: "hello" }];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    const service = new TodoServiceImpl(repository);
    const store = new TodoStore(service);
    store.deleteTodo({ id: "xxxx" });
    expect(store.todos$.value).toEqual<Todo[]>([]);
  });
});

import type { Todo } from "@/features/todo/domain/entities";
import { TodoRepositoryImpl } from "@/features/todo/infrastructure/repository";
import { TodoServiceImpl } from "@/features/todo/infrastructure/service";
import { describe, expect, it } from "vitest";

describe("TodoService", () => {
  it("adds a todo", () => {
    const todos: Todo[] = [];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    const service = new TodoServiceImpl(repository);
    service.addTodo({ name: "hello" });
    expect(todos).toEqual<Todo[]>([{ id: "xxxx", name: "hello" }]);
  });

  it("deletes a todo", () => {
    const todos: Todo[] = [{ id: "xxxx", name: "hello" }];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    const service = new TodoServiceImpl(repository);
    service.deleteTodo({ id: "xxxx" });
    expect(todos).toEqual<Todo[]>([]);
  });

  it("gets the list of todos", () => {
    const todos: Todo[] = [];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    const service = new TodoServiceImpl(repository);
    expect(service.getTodos()).toEqual<Todo[]>([]);
  });
});

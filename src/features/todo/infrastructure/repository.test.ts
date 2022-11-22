import type { Todo } from "@/features/todo/domain/entities";
import { TodoRepositoryImpl } from "@/features/todo/infrastructure/repository";
import { describe, expect, it } from "vitest";

describe("TodoRepository", () => {
  it("deletes a todo", () => {
    const todos: Todo[] = [{ id: "xxxx", name: "hello" }];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    repository.deleteOne({ id: "xxxx" });
    expect(todos).toEqual<Todo[]>([]);
  });

  it("inserts a todo", () => {
    const todos: Todo[] = [];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    repository.insertOne({ name: "hello" });
    expect(todos).toEqual<Todo[]>([{ id: "xxxx", name: "hello" }]);
  });

  it("selects all todos", () => {
    const todos: Todo[] = [];
    const repository = new TodoRepositoryImpl(todos, () => "xxxx");
    expect(repository.selectAll()).toEqual<Todo[]>([]);
  });
});

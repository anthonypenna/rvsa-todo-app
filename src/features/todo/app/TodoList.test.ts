import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/vue";
import TodoList from "@/features/todo/app/TodoList.vue";
import { todoStore } from "@/features/todo/app/store";
import type { Todo } from "@/features/todo/domain/entities";

vi.stubGlobal("crypto", {
  randomUUID: vi.fn().mockReturnValue("xxxx"),
});

describe("TodoList", () => {
  it("renders correctly", async () => {
    render(TodoList);

    await screen.findAllByText("todos");

    const input = await screen.findByTestId<HTMLInputElement>("todo-input");
    expect(input.value).toEqual<string>("");

    await todoStore.todoName$.next("hello");
    expect(input.value).toEqual<string>("hello");

    const form = await screen.findByTestId<HTMLFormElement>("todo-form");
    await fireEvent.submit(form);
    expect(todoStore.todoName$.value).toEqual("");
    expect(todoStore.todos$.value).toEqual<Todo[]>([
      { id: "xxxx", name: "hello" },
    ]);

    const todos = await screen.findAllByTestId("todo");
    expect(todos.length).toEqual<number>(1);

    const todoNames = await screen.findAllByTestId("todo-name");
    expect(todoNames[0].textContent).toMatch(/hello/);

    const deleteButtons = await screen.findAllByTestId("todo-delete");
    await fireEvent.click(deleteButtons[0]);
    expect(todoStore.todos$.value).toEqual<Todo[]>([]);
  });
});

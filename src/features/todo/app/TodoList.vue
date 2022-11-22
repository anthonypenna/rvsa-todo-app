<script setup lang="ts">
import { todoStore } from "@/features/todo/app/store";
import { useSubject } from "@vueuse/rxjs";

const todoName = useSubject(todoStore.todoName$);
const todos = useSubject(todoStore.todos$);
</script>

<template>
  <section>
    <header>
      <h1>todos</h1>
    </header>
    <form data-testid="todo-form" @submit.prevent="todoStore.addTodo()">
      <input type="text" v-model="todoName" data-testid="todo-input" />
    </form>
    <ul>
      <li v-for="todo of todos" :key="todo.id" data-testid="todo">
        <p data-testid="todo-name">{{ todo.name }}</p>
        <button data-testid="todo-delete" @click="todoStore.deleteTodo(todo)">
          Delete
        </button>
      </li>
    </ul>
  </section>
</template>

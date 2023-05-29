<template>
	<ul class="todo-list">
		<TodoItem
			v-for="todo in todos"
			:todo="todo"
			:key="todo.id"
			class="todo-item"
			@delete="emits('delete-todo', { id: $event.id })"
			@complete="emits('complete-todo', { id: $event.id })"

		>
		</TodoItem>
	</ul>
</template>

<script setup lang="ts">
import { Todo } from '../types/todo';

interface Props {
	todos: Todo[];
}

interface Events {
	(e: 'delete-todo', payload: { id: number }): void;
	(e: 'complete-todo', payload: { id: number }): void;
}

const { todos } = defineProps<Props>();
const emits = defineEmits<Events>();

</script>

<style scoped></style>

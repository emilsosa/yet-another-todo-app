<template>
	<ul class="todo-list">
		<TodoItem
			v-for="todo in todos"
			:todo="todo"
			:key="todo.id"
			class="todo-item"
			@delete="emits('delete-todo', { id: $event.id })"
			@undo-complete="emits('undo-complete-todo', { id: $event.id })"
			@complete="emits('complete-todo', { id: $event.id })"
		>
		</TodoItem>
	</ul>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo';
import TodoItem from '@/components/TodoItem.vue';

interface Events {
	(e: 'delete-todo', payload: { id: number }): void;
	(e: 'undo-complete-todo', payload: { id: number }): void;
	(e: 'complete-todo', payload: { id: number }): void;
}

const { todos } = defineProps<{ todos: Todo[] }>();
const emits = defineEmits<Events>();
</script>

<style scoped></style>

<template>
	<ul class="todo-list"></ul>

	<DataView :value="todos" data-key="id">
		<template #list="{ data: todo, index }: { data: Todo, index: number }">
			<TodoItem
				:todo="todo"
				:key="todo.id"
				class="todo-item"
				@delete="emits('delete-todo', { id: $event.id })"
				@undo-complete="emits('undo-complete-todo', { id: $event.id })"
				@complete="emits('complete-todo', { id: $event.id })"
			>
			</TodoItem>
		</template>
	</DataView>
</template>

<script setup lang="ts">
import { Todo } from '@/@types/global';
import TodoItem from '@/components/TodoItem.vue';
import DataView from 'primevue/dataview';

interface Events {
	(e: 'delete-todo', payload: { id: number }): void;
	(e: 'undo-complete-todo', payload: { id: number }): void;
	(e: 'complete-todo', payload: { id: number }): void;
}

const { todos } = defineProps<{ todos: Todo[] }>();
const emits = defineEmits<Events>();
</script>

<style scoped></style>

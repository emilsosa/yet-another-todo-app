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

	<DataView :value="todos" data-key="id">
		<template #list="{ data, index }: { data: Todo, index: number }">
			<div class="col-12">
				<div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
					<div
						class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
					>
						<div class="flex flex-column align-items-center sm:align-items-start gap-3">
							<div class="text-2xl font-bold text-900">{{ data.title }}</div>
							<div class="text-2xl font-bold text-900">{{ data.description }}</div>
						</div>
					</div>
				</div>
			</div>
		</template>
	</DataView>
</template>

<script setup lang="ts">
import { Todo } from '@/@types/global';
import DataView from 'primevue/dataview';
import TodoItem from '@/components/TodoItem.vue';
import { Ref } from 'vue';

interface Events {
	(e: 'delete-todo', payload: { id: number }): void;
	(e: 'undo-complete-todo', payload: { id: number }): void;
	(e: 'complete-todo', payload: { id: number }): void;
}

const { todos } = defineProps<{ todos: Ref<Todo[]> }>();
const emits = defineEmits<Events>();
</script>

<style scoped></style>

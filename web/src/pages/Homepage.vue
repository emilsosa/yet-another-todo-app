<template>
	<ConfirmDialog></ConfirmDialog>
	<Toast></Toast>
	<NewTodoForm @create="onCreate" />
	<h5>Pending</h5>
	<TodoList :todos="pendingTodos" @complete-todo="onCompleteTodo" @delete-todo="onDeleteTodo" />
	<h5>Completed</h5>
	<TodoList :todos="completedTodos" @undo-complete-todo="onUndoCompleteTodo" @delete-todo="onDeleteTodo" />
	<div class="todo-count">
		<span
			>{{ store.getters.completedTodos.length }} all time completed tasks /
			{{ store.state.todos.filter((t) => !t.deleted).length }} completed tasks now</span
		>
	</div>
</template>

<script lang="ts" setup>
import TodoList from '@/components/TodoList.vue';
import NewTodoForm from '@/components/NewTodoForm.vue';
import ConfirmDialog from 'primevue/confirmdialog';
import Toast from 'primevue/toast';
import { useMainStore } from '@/stores/main.store';
import { computed } from 'vue';
import { useConfirm } from 'primevue/useconfirm';
import { useToast } from 'primevue/usetoast';

const store = useMainStore();
const confirm = useConfirm();
const toast = useToast();

const pendingTodos = computed(() => store.getters.pendingTodos);
const completedTodos = computed(() => store.getters.completedTodos);

const onCreate = (payload: { id: number; title: string }) => {
	store.actions.addTodo({
		id: payload.id,
		title: payload.title,
	});
};

const onUndoCompleteTodo = (payload: { id: number }) => {
	store.actions.markAsNotCompleted(payload.id);
};

const onDeleteTodo = (payload: { id: number }) => {
	confirm.require({
		message: 'Are you sure that you want to delete this todo?',
		header: 'Confirmation',
		accept: () => {
			toast.add({
				severity: 'success',
				summary: 'Success',
				detail: 'Todo deleted successfully',
				life: 3000,
			});
			store.actions.markAsDeleted(payload.id);
		},
	});
};

const onCompleteTodo = (payload: { id: number }) => {
	store.actions.markAsCompleted(payload.id);
};
</script>

<style></style>

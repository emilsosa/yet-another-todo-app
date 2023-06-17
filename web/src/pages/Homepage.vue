<template>
	<!-- Display errors -->
	<new-todo-form @create="onCreate" />
	<h5>Pending</h5>
	<todo-list :todos="pendingTodos"  @complete-todo="onCompleteTodo" @delete-todo="onDeleteTodo" />
	<h5>Completed</h5>
	<todo-list :todos="completedTodos" @undo-complete-todo="onUndoCompleteTodo"  @delete-todo="onDeleteTodo" />
	<div class="todo-count">
		<span
			>{{ store.getters.completedTodos.length }} all time completed tasks /
			{{ store.state.todos.filter((t) => !t.deleted).length }} completed tasks now</span
		>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';
import TodoList from '@/components/TodoList.vue';
import NewTodoForm from '@/components/NewTodoForm.vue';
import { computed } from 'vue';

const store = useMainStore();

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
	store.actions.markAsDeleted(payload.id);
};

const onCompleteTodo = (payload: { id: number }) => {
	store.actions.markAsCompleted(payload.id);
};
</script>

<style></style>

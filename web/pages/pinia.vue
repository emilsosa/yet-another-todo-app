<template>
	<h1>Pinia</h1>
	<ul>
		<li v-for="todo in store.state.todos" :key="todo.id">
			{{ todo.title }}
		</li>
	</ul>
	<button @click="addTodo">+</button>
	<button @click="removeLastTodo">-</button>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';

const store = useMainStore();

const addTodo = () => {
	const randomNumber = Math.random()
	store.actions.addTodo({
		id: randomNumber,
		title: `New Todo Title ${randomNumber}`,
		description: `New Todo Description ${randomNumber}`,
	})
};
const removeLastTodo = () => {
	if(store.state.todos.length > 0) {
		const lastTodo = store.state.todos[store.state.todos.length - 1]

		store.actions.removeTodo(lastTodo.id)
	}
};
</script>
<style></style>

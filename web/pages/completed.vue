<template>
	<div>
		<h4><p>List of completed tasks</p></h4>
		<ul class="todo-list">
			<li v-for="todo in store.getters.completedTodos" :key="todo.id" class="todo-item">
				<span class="todo-title">{{ todo.title }}</span>
        <button @click="deleteTodo(todo.id)">Delete</button>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';
const store = useMainStore();
const deleteTodo = (id: number) => {
  store.actions.markAsDeleted(id);
};
</script>

<style scoped>

</style>
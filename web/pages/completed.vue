<template>
	<div>
		<h4><p>lista de tareas</p></h4>
		<ul class="todo-list">
			<li v-for="todo in todos" :key="todo.id" class="todo-item">
				<span class="todo-title">{{ todo.title }}</span>
			</li>
		</ul>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';

const store = useMainStore();

const todos = store.state.todos.filter((todo) => todo.completed);
</script>

<style scoped></style>

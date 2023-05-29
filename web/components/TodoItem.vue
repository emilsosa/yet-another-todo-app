<template>
	<li :class="{ complete: todo.completed, hidden: todo.hidden }">
		<q-checkbox :model-value="todo.completed" @click="emits('complete', { id: todo.id })" />
		<span class="todo-title">{{ todo.title }}</span>
		<q-btn dense flat round color="primary" @click="deleteTodo" icon="fa fa-solid fa-trash"></q-btn>
	</li>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo';

interface Emits {
	(e: 'delete', payload: { id: number }): void
	(e: 'complete', payload: { id: number }): void;
}

interface Props {
	todo: Todo;
}

const { todo } = defineProps<Props>();
const emits = defineEmits<Emits>();
const deleteTodo = () => {
emits('delete', { id: todo.id});
todo.hidden = true;

}
</script>

<style scoped>
.complete {
	text-decoration: line-through;
}
.hidden {
  display: none;
}

</style>

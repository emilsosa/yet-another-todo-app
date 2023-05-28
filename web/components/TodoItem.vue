<template>
	<li :class="{ complete: todo.completed }">
		<q-checkbox :model-value="todo.completed" @click="emits('complete', { id: todo.id })" />
		<span class="todo-title">{{ todo.title }}</span>
		<q-btn dense flat round color="primary" @click="emits('delete', { id: todo.id })" icon="fa fa-solid fa-trash"></q-btn>
	</li>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo';

interface Emits {
	(e: 'delete', payload: { id: number }): void;
	(e: 'complete', payload: { id: number }): void;
}

interface Props {
	todo: Todo;
}

const { todo } = defineProps<Props>();
const emits = defineEmits<Emits>();
</script>

<style scoped>
.complete {
	text-decoration: line-through;
}
</style>

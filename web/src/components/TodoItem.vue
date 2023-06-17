<template>
	<li :class="{ complete: todo.completed, hidden: todo.hidden }">
		<input type="checkbox" :vaue="todo.id" :checked="todo.completed" @click="onClick" />
		<span class="todo-title">{{ todo.title }}</span>
		<button @click="deleteTodo"><font-awesome-icon icon="fa fa-trash"></font-awesome-icon></button>
	</li>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo';

interface Emits {
	(e: 'delete', payload: { id: number }): void;
	(e: 'complete', payload: { id: number }): void;
	(e: 'undo-complete', payload: { id: number }): void;
}

interface Props {
	todo: Todo;
}

const { todo } = defineProps<Props>();
const emits = defineEmits<Emits>();
const onClick = () => {
	if (todo.completed) {
		emits('undo-complete', { id: todo.id });
	} else {
		emits('complete', { id: todo.id });
	}
};
const deleteTodo = () => {
	emits('delete', { id: todo.id });
	todo.hidden = true;
};
</script>

<style scoped>
.complete {
	text-decoration: line-through;
}
.hidden {
	display: none;
}
</style>

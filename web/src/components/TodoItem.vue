<template>
	<li :class="{ complete: todo.completed }" v-bind="$attrs">
		<Checkbox :model-value="todo.completed" :value="todo.id" binary @click="onClick" />
		<span class="todo-title">{{ todo.title }}</span>
		<Button @click="deleteTodo" size="small">
			<font-awesome-icon icon="fa fa-trash"></font-awesome-icon>Delete
		</Button>
	</li>
</template>

<script setup lang="ts">
import { Todo } from '@/types/todo';
import Checkbox from 'primevue/checkbox';
import Button from 'primevue/button';

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

<template>
	<div class="col-12">
		<div class="flex flex-column xl:flex-row xl:align-items-start p-4 gap-4">
			<div
				class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
			>
				<Checkbox :model-value="todo.completed" :value="todo.id" binary @click="onClick" />
				<div class="flex flex-column align-items-center sm:align-items-start gap-3">
					<div :class="{ complete: todo.completed }" class="text-2xl font-bold text-900">
						{{ todo.title }}
					</div>
					<div class="text-2xl font-bold text-900">{{ todo.description }}</div>
				</div>

				<Button @click="onDelete" size="small">
					<font-awesome-icon icon="fa fa-trash"></font-awesome-icon>Delete
				</Button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { Todo } from '@/@types/global';
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
const onDelete = () => {
	emits('delete', { id: todo.id });
};
</script>

<style scoped>
.complete {
	text-decoration: line-through;
}
</style>

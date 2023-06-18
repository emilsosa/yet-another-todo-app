<template>
	<div class="surface-section px-4 py-8 md:px-6 lg:px-8">
		<div class="text-700 text-center">
			<form id="add-new-todo-form" class="flex flex-column gap-2" @submit.prevent="onSubmit">
				<InputText
					autofocus
					outlined
					:model-value="values.title"
					type="text"
					label="Add a new to-do"
					placeholder="Remember me to..."
					:class="{ 'p-invalid': errorBag.title }"
					@update:model-value="onInput"
				>
				</InputText>
				<small v-if="errors.title" class="p-error">{{ errors.title }}</small>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Calendar from 'primevue/calendar';
import { useForm } from 'vee-validate';
import { string } from 'yup';
import { ref } from 'vue';
import { Todo } from '@/@types/global';

interface Emits {
	(e: 'create', payload: Pick<Todo, 'id' | 'title'>): void;
}

const emit = defineEmits<Emits>();

const newTodoInput = ref<HTMLInputElement | null>(null);

const { handleSubmit, values, errorBag, errors, setFieldValue, defineInputBinds } = useForm<{
	title: Todo['title'];
}>({
	validationSchema: {
		title: string().required().min(3),
	},
});
defineInputBinds('title');

const onSubmit = handleSubmit(
	(values) => {
		const id = Math.floor(Math.random() * 1000);

		emit('create', { id, title: values.title });
		setFieldValue('title', '');
		newTodoInput.value?.focus();
	},
	() => {
		newTodoInput.value?.focus();
	}
);

const onInput = (value: string) => {
	setFieldValue('title', value);
};
</script>

<style scoped>
.p-error {
	text-transform: capitalize;
}
</style>

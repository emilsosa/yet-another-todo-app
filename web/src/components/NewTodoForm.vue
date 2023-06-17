<template>
	<div class="surface-section px-4 py-8 md:px-6 lg:px-8">
		<div class="text-700 text-center">
			<div v-if="Object.keys(errorBag).length > 0" class="error-bag">
				<ul>
					<li v-for="(errors, key) in errorBag" :key="key">
						The field {{ key }} have the following errors: {{ errors?.join(', ') }}
					</li>
				</ul>
			</div>
			<form id="add-new-todo-form" @submit.prevent="onSubmit">
				<InputText
					autofocus
					outlined
					:model-value="values.title"
					type="text"
					label="Add a new to-do"
					placeholder="Remember me to..."
					@update:model-value="onInput"
				>
				</InputText>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext';
import { useForm } from 'vee-validate';
import { string } from 'yup';
import { ref } from 'vue';
import { Todo } from '@/types/todo';

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

<style scoped></style>

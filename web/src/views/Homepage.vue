<template>
	<!-- Display errors -->
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
					:model-value="values.todo"
					:error="(errorBag.todo?.length || 0) > 0"
					:error-message="errors.todo"
					type="text"
					label="Add a new to-do"
					placeholder="Remember me to..."
					@update:model-value="onInput"
				>
				</InputText>
				<font-awesome-icon name="fa-solid fa-paper-plane"></font-awesome-icon>
			</form>
		</div>
	</div>
	<h5>Pending</h5>
	<todo-list :todos="store.getters.pendingTodos" @complete-todo="completeTodo" @delete-todo="deleteTodo" />
	<h5>Completed</h5>
	<todo-list :todos="store.getters.completedTodos" @complete-todo="completeTodo" @delete-todo="deleteTodo" />
	<div class="todo-count">
		<span
			>{{ store.getters.completedTodos.length }} all time completed tasks /
			{{ store.state.todos.filter((t) => !t.deleted).length }} completed tasks now</span
		>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';
import { useForm } from 'vee-validate';
import { string } from 'yup';
import { Todo } from '@/types/todo';
import { ref } from 'vue';
import InputText from 'primevue/inputtext';

interface AddTodoForm {
	todo: Todo['title'];
}

const store = useMainStore();
const newTodoInput = ref<HTMLInputElement | null>(null);

const { handleSubmit, values, errorBag, errors, setFieldValue, defineInputBinds } = useForm<AddTodoForm>({
	validateOnMount: false,
	validationSchema: {
		todo: string().required().min(3),
	},
});
defineInputBinds('todo');

const onSubmit = handleSubmit(
	(values) => {
		const id = Math.floor(Math.random() * 1000);
		store.actions.addTodo({
			id,
			title: values.todo,
		});
		setFieldValue('todo', '');
		newTodoInput.value?.focus();
	},
	() => {
		newTodoInput.value?.focus();
	}
);

const onInput = (value: string) => {
	setFieldValue('todo', value);
};

const deleteTodo = (payload: { id: number }) => {
	store.actions.markAsDeleted(payload.id);
};

const completeTodo = (payload: { id: number }) => {
	store.actions.markAsCompleted(payload.id);
};
</script>

<style></style>

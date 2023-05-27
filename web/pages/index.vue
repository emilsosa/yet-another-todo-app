<template>
	<!-- Display errors -->
	<div v-if="Object.keys(errorBag).length > 0" class="error-bag">
		<ul>
			<li v-for="(errors, key) in errorBag" :key="key">
				The field {{ key }} have the following errors: {{ errors?.join(', ') }}
			</li>
		</ul>
	</div>
	<div class="add-todo">
		<q-form @submit.prevent="onSubmit">
			<q-input
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
				<template v-slot:append>
					<q-btn type="submit" round dense flat @click="onSubmit">
						<q-icon name="fa-solid fa-paper-plane" />
					</q-btn>
				</template>
			</q-input>
		</q-form>
	</div>
	<ul class="todo-list">
		<li v-for="todo in store.getters.pendingTodos" :key="todo.id" class="todo-item">
			<input type="checkbox" v-model="todo.completed" />
			<span class="todo-title">{{ todo.title }}</span>
			<button @click="deleteTodo(todo.id)">Delete</button>
			<button @click="completeTodo(todo.id)">Complete</button>
		</li>
	</ul>
	<div class="todo-count">
		<span
			>{{ store.getters.completedTodos.length }} /
			{{ store.state.todos.filter((t) => !t.deleted).length }} tasks completed</span
		>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';
import { useForm } from 'vee-validate';
import { string } from 'yup';
import { Todo } from '@/types/todo';

interface AddTodoForm {
	todo: Todo['title'];
}

const store = useMainStore();
const newTodoInput = ref<HTMLInputElement | null>(null);

const { handleSubmit, submitCount, values, errorBag, errors, setFieldValue, defineInputBinds } = useForm<AddTodoForm>({
	validateOnMount: false,
	validationSchema: {
		todo: string().required().min(3),
	},
});
defineInputBinds('todo');

const onSubmit = handleSubmit(
	(values) => {
		debugger;
		const id = Math.floor(Math.random() * 1000);
		store.actions.addTodo({
			id,
			title: values.todo,
		});
		setFieldValue('todo', '', { force: true });
		newTodoInput.value?.focus();
	},
	() => {
		newTodoInput.value?.focus();
	}
);

const onInput = (value: string) => {
	setFieldValue('todo', value);
};

const deleteTodo = (id: number) => {
	store.actions.markAsDeleted(id);
};

const completeTodo = (id: number) => {
	store.actions.markAsCompleted(id);
};
</script>

<style></style>

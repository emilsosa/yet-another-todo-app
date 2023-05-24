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
		<form @submit.prevent="onSubmit">
			<input
				ref="newTodoInput"
				name="todo"
				type="text"
				:value="values.todo"
				@input="onInput"
				placeholder="Add a new to-do"
			/>
			<button type="submit">Add</button>
		</form>
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
const { handleSubmit, values, errorBag, setFieldValue, defineInputBinds } = useForm<AddTodoForm>({
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
		setFieldValue('todo', '', { force: true });
		newTodoInput.value?.focus();
	},
	() => {
		newTodoInput.value?.focus();
	}
);

const onInput = (event: Event) => {
	const value = (event.target as HTMLInputElement).value.toString();

	setFieldValue('todo', value);
};

const deleteTodo = (id: number) => {
	store.actions.markAsDeleted(id);
};


const completeTodo = (id: number) => {
	store.actions.markAsCompleted(id);
};
</script>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	name: 'index',
});
</script>

<style>
.add-todo {
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-bottom: 20px;
}

.todo-list {
	list-style: none;
	padding: 0;
	margin: 0;
}

.todo-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 10px;
	border-bottom: 1px solid #ccc;
}

.todo-item:last-child {
	border-bottom: none;
}

.todo-title {
	flex-grow: 1;
	margin-right: 10px;
}

button {
	padding: 10px;
	border-radius: 5px;
	border: none;
	background-color: #2ecc71;
	color: #fff;
	cursor: pointer;
	transition: background-color 0.3s ease;
}

button:hover {
	background-color: #27ae60;
}

.todo-count {
	text-align: center;
	margin-top: 20px;
}
</style>

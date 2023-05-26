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
      <div class="containerAddButton">
			<button type="submit">Add</button>
      </div>
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
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  color: #fff;
  font-size: 16px;
  cursor: pointer;
  /* Additional styles for visual effects */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;
}
.containerAddButton {
  display: flex;
  justify-content: center;
}

/* Alternative method to center the button horizontally */
.containerAddButton {
  text-align: center;
}

/* Style for the button when hovered */

.todo-list {
	list-style: none;
	padding: 0;
	margin: 0;
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
	background-color: #2980b9;
}

.todo-count {
	text-align: center;
	margin-top: 20px;
}

input {
  padding: 10px;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  color: #333;
  width: 200%;
}

/* Style for all input fields when focused */
input:focus {
  outline: none;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

/* Style for all input fields' placeholder text */
input::placeholder {
  color: #999;
}

/* Style for all input fields when disabled */
input:disabled {
  background-color: #f5f5f5;
  cursor: not-allowed;
}

/* Style for all input fields when there is an error */
input.error {
  border-color: #e53935;
}

</style>

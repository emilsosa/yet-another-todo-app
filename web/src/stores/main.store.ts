import { defineStore } from 'pinia';
import { reactive, computed } from 'vue';
import { Todo } from '../@types/global';

interface State {
	todos: Todo[];
}

export const useMainStore = defineStore('main', () => {
	const state = reactive<State>({
		todos: [],
	});

	const getters = {
		completedTodos: computed(() => {
			return state.todos.filter((todo) => todo.completed);
		}),
		deletedTodos: computed(() => {
			return state.todos.filter((todo) => todo.deleted);
		}),
		pendingTodos: computed(() => {
			return state.todos.filter((todo) => !todo.completed && !todo.deleted);
		}),
	};

	const actions = {
		addTodo(todo: { id: Todo['id']; title: Todo['title']; description?: Todo['description'] }) {
			state.todos.push({ ...todo, completed: false, deleted: false });
		},
		removeTodo(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos.splice(index, 1);
		},
		markAsCompleted(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos[index].completed = true;
		},
		markAsNotCompleted(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos[index].completed = false;
		},
		markAsDeleted(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos[index].deleted = true;
		},
		markAsUndone(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos[index].deleted = false;
		},

	};

	return {
		state,
		actions,
		getters,
	};
});

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
		archivedTodos: computed(() => {
			return state.todos.filter((todo) => todo.archived);
		}),
		pendingTodos: computed(() => {
			return state.todos.filter((todo) => !todo.completed && !todo.archived);
		}),
	};

	const actions = {
		addTodo(todo: { id: Todo['id']; title: Todo['title']; description?: Todo['description'] }) {
			state.todos.unshift({ ...todo, completed: false, archived: false, tags: [] });
		},
		markAsCompleted(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos[index].completed = true;
		},
		markAsNotCompleted(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos[index].completed = false;
		},
		deleteTodo(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);

			state.todos.splice(index, 1);
		},
	};

	return {
		state,
		actions,
		getters,
	};
});

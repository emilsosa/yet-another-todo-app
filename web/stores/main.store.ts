import { defineStore } from 'pinia';
import { reactive } from "vue";

interface Todo {
	id: number;
	title: string;
	description?: string;
}

interface State {
	todos: Todo[];
}


export const useMainStore = defineStore('main', () => {

	const state = reactive<State>({
		todos: [],
	});

	const actions = {
		addTodo(todo: Todo) {
			state.todos.push(todo);
		},
		removeTodo(id: Todo['id']) {
			const index = state.todos.findIndex((todo) => todo.id === id);
			state.todos.splice(index, 1);
		}
	};

	return {
		state,
		actions,
	};
});

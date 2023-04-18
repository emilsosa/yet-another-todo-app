<template>
    <div class="todo-app">
        <h1 class="title">Vue 3 To-Do App</h1>
        <div class="add-todo">
            <input type="text" v-model="newTodo" placeholder="Add a new to-do" @keydown.enter="addTodo" />
            <button @click="addTodo">Add</button>
        </div>
        <ul class="todo-list">
            <li v-for="todo in todos" :key="todo.id" class="todo-item">
                <input type="checkbox" v-model = "todo.completed" />
                <span class="todo-title">{{ todo.title }}</span>
                <button @click="deleteTodo(todo.id)">Delete</button>
                <button @click="completeTodo(todo.id)">Complete</button>
            </li>
        </ul>
        <div class="todo-count">
            <span>{{ getCompletedTodos }} / {{ getTotalTodos }} tasks completed</span>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

export default defineComponent({
    name: 'TodoList',
    setup() {
        const newTodo = ref('');
        const todos = ref<Todo[]>([]);
        const todosCompleted = reactive({
            count: 0
        });

        const addTodo = () => {
            if (newTodo.value.trim() === '') {
                return;
            }

            todos.value.push({
                id: Date.now(),
                title: newTodo.value,
                completed: false,
            });

            newTodo.value = '';
        };

        const deleteTodo = (id: number) => {
            const index = todos.value.findIndex((todo) => todo.id === id);
            if (index !== -1) {
                todos.value.splice(index, 1);
            }
        };

        const completeTodo = (id:number) => {
            const index = todos.value.findIndex((todo) => todo.id === id);
            todos.value[index].completed = true;
            todosCompleted.count++
        };

        const getCompletedTodos = computed(() => {
            return todos.value.filter((todo) => todo.completed).length;
        });

        const getTotalTodos = computed(() => {
            return todos.value.length;
        });

        return {
            newTodo,
            todos,
            addTodo,
            deleteTodo,
            completeTodo,
            count: todosCompleted.count,
            todosCompleted,
            getCompletedTodos,
            getTotalTodos,
        };
    },
});
</script>
<style>
.todo-app {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
}

.title {
    text-align: center;
}

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

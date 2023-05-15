<template>
    <div>
        <h4><p>lista de tareas</p></h4>
        <ul class="todo-list">
            <li v-for="todo in todos" :key="todo.id" class="todo-item">
                <span class="todo-title">{{ todo.title }}</span>
            </li>
        </ul>
        <div class="todo-count">
            <span>{{ getCompletedTodos }} / {{ getTotalTodos }} tasks completed</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, computed } from 'vue';

const newTodo = ref('');
const todos = ref<Todo[]>([]);
const todosCompleted = reactive({
    count: 0
});



const getTotalTodos = computed(() => {
    return todos.value.length;
});
const getCompletedTodos = computed(() => {
    return todos.value.filter((todo) => todo.completed).length;
});

</script>

<style scoped>

</style>
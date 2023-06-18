<template>
    <div>
        <h4><p>lista de tareas archivadas</p></h4>
        <ul class="todo-list">
            <li v-for="todo in store.getters.archivedTodos" :key="todo.id" class="todo-item">
                <span class="todo-title">{{ todo.title }}</span>
                <button @click="undoStatusTodo(todo.id)">Undo</button>
            </li>
        </ul>
    </div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';
const store = useMainStore();

const undoStatusTodo = (id: number) => {
    store.actions.markAsUndone(id);

    //add es-en
}
</script>

<style scoped>

</style>
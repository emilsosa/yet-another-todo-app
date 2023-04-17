      <template>
          <div>
              <input type="text" v-model="newTodo" />
              <button @click="addTodo">Add</button>
              <ul>
                  <li v-for="todo in todos" :key="todo.id">
                      <span>{{ todo.title }}</span>
                      <button @click="deleteTodo(todo.id)">Delete</button>
                  </li>
              </ul>
          </div>
      </template>

      <script lang="ts">
          import { defineComponent, ref } from 'vue';

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

                  return {
                      newTodo,
                      todos,
                      addTodo,
                      deleteTodo,
                  };
              },
          });
      </script>


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
	<h5>Pending</h5>
	<todo-list :todos="store.getters.pendingTodos" @complete-todo="completeTodo" @delete-todo="deleteTodo" />
	<h5>Completed</h5>
	<todo-list :todos="store.getters.completedTodos" @complete-todo="completeTodo" @delete-todo="deleteTodo" />
	<div class="todo-count">
		<span
			>{{ store.getters.completedTodos.length }}  all time completed tasks  /
			{{ store.state.todos.filter((t) => !t.deleted).length }} completed tasks now</span
		>
	</div>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/stores/main.store';
import { useForm } from 'vee-validate';
import { string } from 'yup';
import { Todo } from '@/types/todo';
import { useQuasar } from 'quasar';
import cron from 'node-cron';
interface AddTodoForm {
	todo: Todo['title'];
}

const store = useMainStore();
const newTodoInput = ref<HTMLInputElement | null>(null);
const $q = useQuasar();

const { handleSubmit, values, errorBag, errors, setFieldValue, defineInputBinds } = useForm<AddTodoForm>({
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
		setFieldValue('todo', '');
		newTodoInput.value?.focus();
		$q.notify({
			message: 'Todo added!',
			type: 'positive',
			actions: [
				{
					label: 'Undo',
					color: 'white',
					handler: () => {
						console.log('Undo');
					},
				},
			],
		});
	},
	() => {
		newTodoInput.value?.focus();
	}
);

const onInput = (value: string) => {
	setFieldValue('todo', value);
};

const deleteTodo = (payload: { id: number }) => {
	store.actions.markAsDeleted(payload.id);

};

const completeTodo = (payload: { id: number }) => {
	store.actions.markAsCompleted(payload.id);
};


</script>
<script lang="ts">
import { onMounted, onBeforeUnmount } from 'vue';
import cron, { ScheduledTask } from 'node-cron';
export default {
  // ...

  setup() {
    onMounted(() => {
      const scheduledTask: ScheduledTask = cron.schedule('0 10 * * *', () => {
        // Your task logic goes here
        console.log('Scheduled task is running...');
      });
      onBeforeUnmount(() => {
        if (scheduledTask) {
          scheduledTask.stop();
        }
      });
    });
  },

  // ...
};
</script>
<style></style>

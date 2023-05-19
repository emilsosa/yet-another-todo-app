<script setup lang="ts">
import { ref } from 'vue';

const message = ref('Hello World from App.vue!');
</script>
<template>
	<div class="todo-app">
		<NuxtLayout />
		<div id="page-content">
			{{ message }}
			<nuxt-page />
		</div>
	</div>
</template>
<style scoped>
#page-content {
	max-width: 600px;
	margin: 0 auto;
	padding: 50px;
	box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
	background-color: #f2f2f2;
	font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
	font-size: 14px;
	line-height: 1.42857143;
	color: #333;
}
</style>

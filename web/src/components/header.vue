<template>
	<TabMenu :model="items" />
</template>

<script setup lang="ts">
import TabMenu from 'primevue/tabmenu';
import { ref } from 'vue';

const items = ref([
	{
		label: 'Home',
		icon: 'pi pi-fw pi-home',
		to: '/',
	},
	{
		label: 'Completed',
		icon: 'pi pi-fw pi-calendar',
		to: '/completed',
	},
	{
		label: 'Archived',
		icon: 'pi pi-fw pi-pencil',
		to: '/archived',
	},
	{
		label: 'Settings',
		icon: 'pi pi-fw pi-file',
		to: '/settings',
	},
]);
</script>

<style scoped></style>

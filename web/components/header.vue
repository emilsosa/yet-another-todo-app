<template>
	<q-header reveal elevated class="bg-primary text-white" height-hint="98">
		<q-toolbar>
			<q-toolbar-title>
				<q-avatar>
					<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
				</q-avatar>
				To-do App
			</q-toolbar-title>
		</q-toolbar>

		<q-tabs align="left">
			<q-route-tab to="/" label="Homepage" />
			<q-route-tab to="/completed" label="Completed" />
			<q-route-tab to="/deleted" label="Deleted" />
		</q-tabs>
	</q-header>
</template>

<script setup lang="ts"></script>

<style scoped></style>

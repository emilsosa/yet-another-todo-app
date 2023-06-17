<script setup lang="ts">
import Header from '@/components/Header.vue';
import Footer from '@/components/Footer.vue';
</script>
<template>
	<div>
		<header></header>
		<slot></slot>
		<footer></footer>
	</div>
</template>

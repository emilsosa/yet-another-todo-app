import { createRouter, createWebHashHistory } from 'vue-router';

export const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: () => import('@/pages/Homepage.vue'),
			meta: {
				title: 'homepage',
			},
		},
		{
			path: '/completed',
			component: () => import('@/pages/Completed.vue'),
			meta: {
				title: 'completed',
			},
		},
		{
			path: '/archived',
			component: () => import('@/pages/Archived.vue'),
			meta: {
				title: 'archived',
			},
		},
		{
			path: '/settings',
			component: () => import('@/pages/Settings.vue'),
			meta: {
				title: 'settings',
			},
		},
	],
});

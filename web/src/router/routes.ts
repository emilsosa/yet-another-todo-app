import { RouteRecordRaw } from "vue-router";

const rootRoute: RouteRecordRaw = {
	path: '/',
	component: () => import('@/pages/Homepage.vue'),
	meta: {
		title: 'homepage',
	}
}


export const routes: RouteRecordRaw[] = [
	rootRoute,
]
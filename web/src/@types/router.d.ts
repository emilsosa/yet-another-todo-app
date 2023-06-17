import 'vue-router';
import Messages from "@/i18n/locales/en.json";

declare module 'vue-router' {
	interface RouteMeta {
		title: keyof typeof Messages['pageTitles'];
	}
}

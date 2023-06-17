import 'vue-router';
import Messages from "@/i18n/locales/en-US.json";

declare module 'vue-router' {
	interface RouteMeta {
		title: keyof typeof Messages['pageTitles'];
	}
}

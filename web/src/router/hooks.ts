import { NavigationGuardWithThis } from 'vue-router';
import { useTitle } from '@vueuse/core';
import { i18n } from '@/i18n/i18n';

export const setPageTitle: NavigationGuardWithThis<void> = (to, _from, next) => {
	const { t } = i18n.global;

	const pageTitle = t('pageTitles.' + to.meta.title);
	const appName = __APP_NAME__

	useTitle(`${pageTitle} | ${appName}`);

	next();
};

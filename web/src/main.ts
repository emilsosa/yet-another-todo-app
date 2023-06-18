import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { router } from '@/router/router';
import { i18n } from '@/i18n/i18n';

import PrimeVue from 'primevue/config';
import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import '@/styles/main.css';

import FontAwesomePlugin from '@/plugins/fontawesome.plugin';
import ConfirmationService from 'primevue/confirmationservice';
import ToastService from 'primevue/toastservice';

import App from './App.vue';

const pinia = createPinia();

const app = createApp(App);
app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(i18n);
app.use(FontAwesomePlugin);
app.use(ConfirmationService);
app.use(ToastService);
app.mount('#app');

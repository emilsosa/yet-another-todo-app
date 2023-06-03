import type { Plugin } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

export const fontAwesomePlugin: Plugin = {
	install(app, ..._options) {
		library.add(faPlane);

		app.component('font-awesome-icon', FontAwesomeIcon);
	},
};

import type { Plugin } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane, faTrash } from '@fortawesome/free-solid-svg-icons';

export const fontAwesomePlugin: Plugin = {
	install(app, ..._options) {
		library.add(faPaperPlane, faTrash);

		app.component('font-awesome-icon', FontAwesomeIcon);
	},
};

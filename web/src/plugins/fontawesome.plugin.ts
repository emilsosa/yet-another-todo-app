import type { Plugin } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faPaperPlane, faTrash, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

export default <Plugin>{
	install(app, ..._options) {
		library.add(faPaperPlane, faTrash, faTriangleExclamation);

		app.component('font-awesome-icon', FontAwesomeIcon);
	},
};

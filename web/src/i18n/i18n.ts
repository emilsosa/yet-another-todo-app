import { createI18n } from 'vue-i18n';
import enUS from './locales/en-US.json'
import esDO from './locales/es-DO.json'

type MessageSchema = typeof enUS

export const i18n = createI18n<[MessageSchema], 'en-US' | 'es-DO'>({
	locale: 'en-US',
	messages: {
	  'en-US': enUS,
	  'es-DO': esDO
	}
 })
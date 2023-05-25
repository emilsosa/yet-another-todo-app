import { defineNuxtPlugin } from 'nuxt-composition-api';
import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin((ctx) => {
    const i18n = createI18n({
        locale: 'en',
        messages: {
            en: require('@/locales/en.json'),
            es: require('@/locales/es.json')
        }
    })

    ctx.app.use(i18n)
})
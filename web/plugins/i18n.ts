import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin((ctx) => {
    const i18n = createI18n({
        locale: 'en',
        messages: {
            en: import('@/locales/en.json'),
            es: import('@/locales/es.json')
        }
    })

    ctx.vueApp.use(i18n)
})
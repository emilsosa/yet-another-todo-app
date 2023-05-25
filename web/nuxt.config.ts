export default defineNuxtConfig({
    components: true,
    ssr: false,
    modules: [
        '@pinia/nuxt',
        '@nuxt/devtools',
    ],
    plugins: [
        '@nuxtjs/composition-api'
    ]
})
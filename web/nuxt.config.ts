export default defineNuxtConfig({
	components: true,
	ssr: false,
	modules: ['@pinia/nuxt', '@nuxt/devtools', 'nuxt-quasar-ui'],
	quasar: {
        iconSet: 'fontawesome-v6',
		extras: {
			fontIcons: ['fontawesome-v6'],
		},
	},
});

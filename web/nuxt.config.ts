export default defineNuxtConfig({
	components: true,
	ssr: false,
	modules: ['@pinia/nuxt', '@nuxt/devtools', 'nuxt-quasar-ui'],
	quasar: {
		config: {
			notify: {},
		},
		iconSet: 'fontawesome-v6',
		plugins: ['Notify'],
		extras: {
			fontIcons: ['fontawesome-v6'],
		},
	},
});

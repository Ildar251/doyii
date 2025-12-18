import svgLoader from 'vite-svg-loader'
export default defineNuxtConfig({
	compatibilityDate: '2025-07-15',
	devtools: { enabled: true },
	modules: [
		'@nuxtjs/strapi',
		'nuxt-marquee',
		'@primevue/nuxt-module',
		'@vee-validate/nuxt',
		'@vueuse/motion/nuxt',
	],

	css: [
		'swiper/css',
		'swiper/css/navigation',
		'swiper/css/pagination',
		'~/assets/styles/main.scss',
		'primeicons/primeicons.css',
	],

	vite: {
		plugins: [svgLoader()],
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
            @use "@/assets/styles/_variables.scss" as *;
            @use "@/assets/styles/_mixins.scss" as *;
			@use "@/assets/styles/_anim.scss" as *;
          `,
				},
			},
		},
		resolve: {
			alias: {
				qs: 'qs/dist/qs.js',
			},
		},
	},

	runtimeConfig: {
		strapi: {
			url: 'http://localhost:1337',
		},
		public: {
			strapi: {
				url: 'http://localhost:1337',
			},
		},
	},

	primevue: {
		importTheme: { from: '@/preset/MyPreset.ts' },
	},
	strapi: {
		url: process.env.STRAPI_URL || 'http://localhost:1337',
		token: process.env.STRAPI_TOKEN || undefined,
		prefix: '/api',
		admin: '/admin',
		version: 'v5',
		cookie: {},
	},

	app: {
		pageTransition: { name: 'page', mode: 'out-in' },
	},
})

export default [
	'strapi::errors',
	{
		name: 'strapi::security',
		config: {
			contentSecurityPolicy: {
				useDefaults: true,
				directives: {
					'img-src': ["'self'", 'data:', 'blob:', 'dl.airtable.com'],
					'media-src': ["'self'", 'data:', 'blob:'],
					upgradeInsecureRequests: null,
				},
			},
		},
	},
	{
		name: 'strapi::cors',
		config: {
			enabled: true,
			origin: [
				'https://doyii-95jq-git-main-ilda251s-projects.vercel.app',
				'https://doyii-95jq.vercel.app',
				'https://doyii.vercel.app',
			],
			headers: '*',
			credentials: true,
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS', 'HEAD'],
		},
	},
	'strapi::poweredBy',
	'strapi::logger',
	'strapi::query',
	'strapi::body',
	'strapi::session',
	'strapi::favicon',
	'strapi::public',
]

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
			origin: ['http://localhost:3000', 'https://example.com'],
			methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
			credentials: true,
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

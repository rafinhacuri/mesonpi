const {
	SITE_URL,
	IMAGES_PATH,
	JWT,
	MONGO_URL,
	MONGO_USERNAME,
	MONGO_PASSWORD,
	MONGO_DB_NAME,
	LDAP_URL,
	LDAP_DN,
	LDAP_PASSWORD,
	LDAP_PEOPLE_DN,
	LDAP_GROUPS_DN,
	DEV_URL,
	DEV_KEY,
	DEV_CERT
} = process.env

export default defineNuxtConfig({
	devServer: {
		port: 4000,
		host: DEV_URL
	},
	runtimeConfig: {
		IMAGES_PATH,
		JWT,
		MONGO_URL,
		MONGO_USERNAME,
		MONGO_PASSWORD,
		MONGO_DB_NAME,
		LDAP_URL,
		LDAP_DN,
		LDAP_PASSWORD,
		LDAP_PEOPLE_DN,
		LDAP_GROUPS_DN,
		public: {
			SITE_URL
		}
	},
	ui: {
		icons: ['skill-icons', 'logos', 'fa6-brands']
	},
	css: ['~/assets/global.css'],
	modules: [
		'@nuxt/ui',
		'@pinia/nuxt',
		'@pinia-plugin-persistedstate/nuxt',
		'@nuxt/image',
		'@nuxtseo/module'
	],
	site: {
		url: SITE_URL,
		name: 'Mesonpi',
		description:
			'Explore nossa coleção de sites que destacam a pesquisa de ponta, educação e divulgação científica do Centro Brasileiro de Pesquisas Físicas (CBPF). Descubra o mundo da física e seu impacto em nossa sociedade.',
		defaultLocale: 'pt-BR',
		identity: {
			type: 'Organization'
		},
		twitter: '@cbpf_mcti'
	},
	robots: {
		disallow: ['/login', '/admin']
	},
	app: {
		baseURL: '/projetos/',
		buildAssetsDir: '/projetos/_nuxt/'
	},
	devtools: {enabled: true}
})

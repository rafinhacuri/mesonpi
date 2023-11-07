import ldap from 'ldapjs'

const { LDAP_URL, LDAP_DN, LDAP_PASSWORD } = useRuntimeConfig()

export const ldapClient = ldap.createClient({
	url: LDAP_URL,
	reconnect: { initialDelay: 100, maxDelay: 500, failAfter: Number.POSITIVE_INFINITY },
})

ldapClient.bind(LDAP_DN, LDAP_PASSWORD, () => {})

const { LDAP_GROUPS_DN } = useRuntimeConfig()
export default (): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		let members: string[] = []
		ldapClient.search(
			LDAP_GROUPS_DN,
			{
				filter: `(cn=administrador)`,
				scope: 'sub',
				attributes: ['member'],
			},
			(err, res) => {
				if (err)
					return reject('erro ao ler o banco de usuarios')

				res.on('searchEntry', (entry) => {
					members = entry.pojo.attributes[0].values
				})
				res.on('error', () => {
					return reject('erro ao ler o banco de usuarios')
				})
				res.on('end', () => {
					return resolve(members)
				})
			},
		)
	})
}

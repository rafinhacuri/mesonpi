const { LDAP_PEOPLE_DN } = useRuntimeConfig()
export default (nome: string): Promise<boolean> => {
	return new Promise((resolve, reject) => {
		const users: string[] = []
		ldapClient.search(
			LDAP_PEOPLE_DN,
			{
				filter: `(uid=*)`,
				scope: 'sub',
				attributes: ['uid'],
			},
			(err, res) => {
				if (err)
					return reject('erro ao ler o banco de usuarios')

				res.on('searchEntry', (entry) => {
					users.push(entry.pojo.attributes[0].values[0])
				})
				res.on('error', () => {
					return reject('erro ao ler o banco de usuarios')
				})
				res.on('end', () => {
					return resolve(users.includes(nome))
				})
			},
		)
	})
}

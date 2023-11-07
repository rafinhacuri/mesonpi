const { LDAP_PEOPLE_DN } = useRuntimeConfig()
export default (nome: string): Promise<string[]> => {
	return new Promise((resolve, reject) => {
		const senhas: string[] = []

		ldapClient.search(
			LDAP_PEOPLE_DN,
			{
				filter: `(uid=${nome})`,
				scope: 'sub',
				attributes: ['userPassword'],
			},
			(err, res) => {
				if (err)
					return reject('Erro ao ler o banco de usuários')

				res.on('searchEntry', (entry) => {
					const usersSenhas = entry.attributes[0]
					if (usersSenhas && usersSenhas.values.length > 0) {
						for (const senha of usersSenhas.values)
							senhas.push(senha)
					}
				})
				res.on('error', () => {
					return reject('Erro ao ler o banco de usuários')
				})
				res.on('end', () => {
					return resolve(senhas)
				})
			},
		)
	})
}

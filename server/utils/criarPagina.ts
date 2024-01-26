export default (
	titulo: string,
	url: string,
	img: string,
	tipo: 'web' | 'outros' | 'legados',
	descricao?: string,
): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		const existe = await fetchPagina(url, tipo).catch((err) => {
			return reject(err)
		})
		if (!existe) {
			const novaOrdem = await fetchUltimaOrdem(tipo) + 1
			if (tipo === 'web') {
				const web = await new Web({
					titulo,
					url,
					img,
					ordem: novaOrdem,
					tipo,
					descricao,
				})
					.save()
					.catch((err) => {
						new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
						return reject('Erro ao criar pagina web')
					})
				if (web)
					return resolve(web._id)
			}
			else if (tipo === 'outros') {
				const outro = await new Outro({
					titulo,
					url,
					img,
					ordem: novaOrdem,
					tipo,
					descricao,
				})
					.save()
					.catch((err) => {
						new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
						return reject('Erro ao criar pagina outros')
					})
				if (outro)
					return resolve(outro._id)
			}
			else if (tipo === 'legados') {
				const legado = await new Legado({
					titulo,
					url,
					img,
					ordem: novaOrdem,
					tipo,
					descricao,
				})
					.save()
					.catch((err) => {
						new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
						return reject('Erro ao criar pagina legados')
					})
				if (legado)
					return resolve(legado._id)
			}
			else { return reject('Erro ao criar pagina') }
		}
		else { return reject('Pagina já existe') }
	})
}

import { Erro, Legado, Outro, Web } from './mongoose'

export default (
	id: string,
	tipo: 'web' | 'outros' | 'legados',
	titulo?: string,
	descricao?: string,
	url?: string,
	img?: string,
): Promise<Pagina['_id']> => {
	return new Promise(async (resolve, reject) => {
		if (titulo && descricao && url && img) {
			const existe = await fetchPagina(url, tipo).catch((err) => {
				return reject(err)
			})

			if (!existe) {
				if (tipo === 'web') {
					const web = await new Web({
						id,
						tipo,
						titulo,
						url,
						descricao,
						img,
					})
						.save()
						.catch((err) => {
							new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
							return reject('Erro ao criar pagina')
						})
					if (web)
						return resolve(web._id)
				}
				else if (tipo === 'outros') {
					const outro = await new Outro({
						id,
						tipo,
						titulo,
						url,
						descricao,
						img,
					})
						.save()
						.catch((err) => {
							new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
							return reject('Erro ao criar pagina')
						})
					if (outro)
						return resolve(outro._id)
				}
				else if (tipo === 'legados') {
					const legado = await new Legado({
						id,
						tipo,
						titulo,
						url,
						descricao,
						img,
					})
						.save()
						.catch((err) => {
							new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
							return reject('Erro ao criar pagina')
						})
					if (legado)
						return resolve(legado._id)
				}
				else { return reject('Erro ao criar pagina') }
			}
			else { return reject('Pagina já existe') }
		}
	})
}

import { Erro, Legado, Outro, Web } from './mongoose'

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
			if (tipo === 'web') {
				const web = await new Web({
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
	})
}

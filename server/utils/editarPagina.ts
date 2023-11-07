import { Erro, Legado, Outro, Web } from './mongoose'

export default (
	id: string,
	tipo: string,
	tipoOld: string,
	titulo?: string,
	descricao?: string,
	url?: string,
	img?: string,
): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		if (tipoOld === 'web') {
			const web = await Web.findById(id).catch((err) => {
				new Erro({
					erro: { info: 'Não foi possível ler a pagina do banco de dados', err },
				}).save()
				return reject('Erro ao baixar Pagina')
			})
			if (web) {
				if (tipo === 'web') {
					if (titulo && titulo !== web.titulo)
						web.titulo = titulo
					if (descricao && descricao !== web.descricao)
						web.descricao = descricao
					if (url && url !== web.url)
						web.url = url
					if (img)
						web.img = img
					web.save().catch((err) => {
						new Erro({
							erro: { info: 'Não foi possível Editar a pagina no banco de dados', err },
						}).save()
						return reject('Erro ao salvar Pagina')
					})
					return resolve('Editado com sucesso')
				}
				else {
					if (tipo === 'outros') {
						await new Outro({
							tipo,
							titulo,
							url,
							descricao,
							img: img || web.img,
						})
							.save()
							.catch((err) => {
								new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
								return reject('Erro ao criar pagina')
							})
					}
					if (tipo === 'legados') {
						await new Legado({
							tipo,
							titulo,
							url,
							descricao,
							img: img || web.img,
						})
							.save()
							.catch((err) => {
								new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
								return reject('Erro ao criar pagina')
							})
					}
					await Web.findByIdAndDelete(id).catch((err) => {
						new Erro({
							erro: {
								info: 'Erro ao excluir pagina do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao excluir pagina')
					})
					return resolve('Pagina excluida com sucesso')
				}
			}
		}
		if (tipoOld === 'legados') {
			const legados = await Legado.findById(id).catch((err) => {
				new Erro({
					erro: { info: 'Não foi possível ler a pagina do banco de dados', err },
				}).save()
				return reject('Erro ao baixar Pagina')
			})
			if (legados) {
				if (tipo === 'legados') {
					if (titulo && titulo !== legados.titulo)
						legados.titulo = titulo
					if (descricao && descricao !== legados.descricao)
						legados.descricao = descricao
					if (url && url !== legados.url)
						legados.url = url
					if (img)
						legados.img = img
					legados.save().catch((err) => {
						new Erro({
							erro: { info: 'Não foi possível Editar a pagina no banco de dados', err },
						}).save()
						return reject('Erro ao salvar Pagina')
					})
					return resolve('Editado com sucesso')
				}
				else {
					if (tipo === 'web') {
						await new Web({
							tipo,
							titulo,
							url,
							descricao,
							img: img || legados.img,
						})
							.save()
							.catch((err) => {
								new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
								return reject('Erro ao criar pagina')
							})
					}
					if (tipo === 'outros') {
						await new Outro({
							tipo,
							titulo,
							url,
							descricao,
							img: img || legados.img,
						})
							.save()
							.catch((err) => {
								new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
								return reject('Erro ao criar pagina')
							})
					}
					await Legado.findByIdAndDelete(id).catch((err) => {
						new Erro({
							erro: {
								info: 'Erro ao excluir pagina do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao excluir pagina')
					})
					return resolve('Pagina excluida com sucesso')
				}
			}
		}
		if (tipoOld === 'outros') {
			const outros = await Outro.findById(id).catch((err) => {
				new Erro({
					erro: { info: 'Não foi possível ler a pagina do banco de dados', err },
				}).save()
				return reject('Erro ao baixar Pagina')
			})
			if (outros) {
				if (tipo === 'outros') {
					if (titulo && titulo !== outros.titulo)
						outros.titulo = titulo
					if (descricao && descricao !== outros.descricao)
						outros.descricao = descricao
					if (url && url !== outros.url)
						outros.url = url
					if (img)
						outros.img = img
					outros.save().catch((err) => {
						new Erro({
							erro: { info: 'Não foi possível Editar a pagina no banco de dados', err },
						}).save()
						return reject('Erro ao salvar Pagina')
					})
					return resolve('Editado com sucesso')
				}
				else {
					if (tipo === 'web') {
						await new Web({ tipo, titulo, url, descricao, img: img || outros.img })
							.save()
							.catch((err) => {
								new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
								return reject('Erro ao criar pagina')
							})
					}
					if (tipo === 'legados') {
						await new Legado({ tipo, titulo, url, descricao, img: img || outros.img })
							.save()
							.catch((err) => {
								new Erro({ erro: { info: 'Erro ao criar Pagina no banco de dados', err } }).save()
								return reject('Erro ao criar pagina')
							})
					}
					await Outro.findByIdAndDelete(id).catch((err) => {
						new Erro({
							erro: {
								info: 'Erro ao excluir pagina do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao excluir pagina')
					})
					return resolve('Pagina excluida com sucesso')
				}
			}
		}
	})
}

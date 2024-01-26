export default (
	id: string,
	tipo: 'web' | 'outros' | 'legados',
	tipoOld: 'web' | 'outros' | 'legados',
	titulo?: string,
	descricao?: string,
	url?: string,
	img?: string,
): Promise<string> => {
	return new Promise(async (resolve, reject) => {
		if (tipo === tipoOld) {
			if (tipo && tipoOld === 'web') {
				const web = await Web.findById(id).catch((err) => {
					new Erro({
						erro: { info: 'Não foi possível ler a página do banco de dados', err },
					}).save()
					return reject('Erro ao baixar Página')
				})

				if (web) {
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
							erro: { info: 'Não foi possível Editar a página no banco de dados', err },
						}).save()
						return reject('Erro ao salvar Página')
					})

					return resolve('Editado com sucesso')
				}
			}
			else if (tipo && tipoOld === 'legados') {
				const legados = await Legado.findById(id).catch((err) => {
					new Erro({
						erro: { info: 'Não foi possível ler a página do banco de dados', err },
					}).save()
					return reject('Erro ao baixar Página')
				})

				if (legados) {
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
							erro: { info: 'Não foi possível Editar a página no banco de dados', err },
						}).save()
						return reject('Erro ao salvar Página')
					})

					return resolve('Editado com sucesso')
				}
			}
			else if (tipo && tipoOld === 'outros') {
				const outros = await Outro.findById(id).catch((err) => {
					new Erro({
						erro: { info: 'Não foi possível ler a página do banco de dados', err },
					}).save()
					return reject('Erro ao baixar Página')
				})

				if (outros) {
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
							erro: { info: 'Não foi possível Editar a página no banco de dados', err },
						}).save()
						return reject('Erro ao salvar Página')
					})

					return resolve('Editado com sucesso')
				}
			}
		}

		else if (titulo && url && tipo && descricao) {
			const paginaOriginal = await fetchPaginaByID(id, tipoOld)
			await criarPagina(
				titulo || paginaOriginal.titulo,
				url || paginaOriginal.url,
				img || paginaOriginal.img,
				tipo,
				descricao || paginaOriginal.descricao,
			)
			await excluirPagina(id, tipoOld)
			return resolve('Editado com sucesso')
		}

		reject('Tipo antigo inválido')
	})
}

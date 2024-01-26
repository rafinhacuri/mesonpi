export default (id: string, tipo: 'web' | 'outros' | 'legados'): Promise<Pagina> => {
	return new Promise(async (resolve, reject) => {
		if (id) {
			if (tipo === 'web') {
				const web = await Web.findById(id)
					.catch((err) => {
						new Erro({
							erro: {
								info: 'Não foi possivel ler as Paginas do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao baixar as Paginas')
					})

				if (web) {
					return resolve({
						_id: web._id,
						titulo: web.titulo,
						url: web.url,
						descricao: web.descricao,
						img: web.img,
						ordem: web.ordem,
						tipo: 'web',
					})
				}
			}
			else if (tipo === 'outros') {
				const outro = await Outro.findById(id)
					.catch((err) => {
						new Erro({
							erro: {
								info: 'Não foi possivel ler as Paginas do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao baixar as Paginas')
					})

				if (outro) {
					return resolve({
						_id: outro._id,
						titulo: outro.titulo,
						url: outro.url,
						descricao: outro.descricao,
						img: outro.img,
						ordem: outro.ordem,
						tipo: 'outros',
					})
				}
			}
			else if (tipo === 'legados') {
				const legado = await Legado.findById(id)
					.catch((err) => {
						new Erro({
							erro: {
								info: 'Não foi possivel ler as Paginas do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao baixar as Paginas')
					})

				if (legado) {
					return resolve({
						_id: legado._id,
						titulo: legado.titulo,
						url: legado.url,
						descricao: legado.descricao,
						img: legado.img,
						ordem: legado.ordem,
						tipo: 'legados',
					})
				}
			}
			else {
				return reject('ID invalida')
			}
		}
	})
}

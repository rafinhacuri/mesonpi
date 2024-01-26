export default (tipo: 'web' | 'outros' | 'legados'): Promise<Pagina[] | null> => {
	return new Promise(async (resolve, reject) => {
		let result
		if (tipo === 'web') {
			result = await Web.find()
				.sort({ ordem: 1 })
				.catch((err) => {
					new Erro({
						erro: {
							info: 'Não foi possivel ler as Paginas do banco de Web',
							err,
						},
					}).save()
				})
		}
		else if (tipo === 'outros') {
			result = await Outro.find()
				.sort({ ordem: 1 })
				.catch((err) => {
					new Erro({
						erro: {
							info: 'Não foi possivel ler as Paginas do banco de Outros',
							err,
						},
					}).save()
				})
		}
		else if (tipo === 'legados') {
			result = await Legado.find()
				.sort({ ordem: 1 })
				.catch((err) => {
					new Erro({
						erro: {
							info: 'Não foi possivel ler as Paginas do banco de Legados',
							err,
						},
					}).save()
				})
		}
		else {
			return reject('tipo incorreto')
		}

		if (result)
			resolve(result)
		else
			reject(new Error('Erro ao buscar páginas'))
	})
}

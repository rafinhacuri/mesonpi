export default (id: string, tipo: 'web' | 'outros' | 'legados') => {
	return new Promise(async (resolve, reject) => {
		if (tipo === 'web' && id) {
			const objeto = await Web.findById(id)
			if (objeto)
				await Web.updateMany({ ordem: { $gt: objeto.ordem } }, { $inc: { ordem: -1 } })
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
		else if (tipo === 'outros' && id) {
			const objeto = await Outro.findById(id)
			if (objeto)
				await Outro.updateMany({ ordem: { $gt: objeto.ordem } }, { $inc: { ordem: -1 } })
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
		else if (tipo === 'legados' && id) {
			const objeto = await Legado.findById(id)
			if (objeto)
				await Legado.updateMany({ ordem: { $gt: objeto.ordem } }, { $inc: { ordem: -1 } })
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
		else {
			return reject('tipo incorreto')
		}
	})
}

export default (tipo: 'web' | 'outros' | 'legados'): Promise<number> => {
	return new Promise(async (resolve, reject) => {
		let ultimaOrdem: number | undefined

		if (tipo === 'web') {
			const todosWebs = await Web.find()
			if (todosWebs)
				ultimaOrdem = Math.max(...todosWebs.map(obj => obj.ordem).filter(Number.isFinite))
		}
		if (tipo === 'legados') {
			const todosLegados = await Legado.find()
			if (todosLegados)
				ultimaOrdem = Math.max(...todosLegados.map(obj => obj.ordem).filter(Number.isFinite))
		}
		if (tipo === 'outros') {
			const todosOutros = await Outro.find()
			if (todosOutros)
				ultimaOrdem = Math.max(...todosOutros.map(obj => obj.ordem).filter(Number.isFinite))
		}
		if (ultimaOrdem)
			return resolve(Number.isFinite(ultimaOrdem) ? ultimaOrdem : 0)
		return reject('Nenhum Numero de Ordem Encontrado')
	})
}

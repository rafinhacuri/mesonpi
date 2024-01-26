export default defineEventHandler(async (event) => {
	try {
		const { user } = event.context
		if (user !== null) {
			const { fields, files } = await FormidablePromise(event.node.req)
			const titulo = Array.isArray(fields.titulo) ? fields.titulo[0] : fields.titulo
			const url = Array.isArray(fields.url) ? fields.url[0] : fields.url
			const imgFile = Array.isArray(files.img) ? files.img[0] : files.img
			const tipo = Array.isArray(fields.tipo) ? fields.tipo[0] : fields.tipo
			const descricao = Array.isArray(fields.descricao) ? fields.descricao[0] : fields.descricao
			let img: string | undefined
			if (imgFile)
				img = await salvarImagem(imgFile)
			if (titulo && url && img && (tipo === 'web' || tipo === 'outros' || tipo === 'legados') && descricao) {
				await criarPagina(titulo, url, img, tipo, descricao)
				return 'Pagina Criada com Sucesso!'
			}
			throw 'Erro ao inserir pagina'
		}
		throw {
			statusCode: 403,
			statusMessage: 'Proibido',
			message: 'Nao autorizado',
		}
	}
	catch (e) {
		if (e && typeof e === 'string')
			throw createError({ statusCode: 500, message: e, statusMessage: 'Erro no servidor' })
		if (e && typeof e === 'object' && 'statusCode' in e && 'message' in e && 'statusMessage' in e) {
			if (
				typeof e.statusCode === 'number'
				&& typeof e.message === 'string'
				&& typeof e.statusMessage === 'string'
			) {
				throw createError({
					statusCode: e.statusCode,
					message: e.message,
					statusMessage: e.statusMessage,
				})
			}
		}
		throw createError({
			statusCode: 500,
			message: 'Ocorreu um erro desconhecido',
			statusMessage: 'Erro no servidor',
		})
	}
})

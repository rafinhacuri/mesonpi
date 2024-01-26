export default defineEventHandler(async (event) => {
	try {
		const { user } = event.context
		if (user !== null) {
			const { fields, files } = await FormidablePromise(event.node.req)
			const id = Array.isArray(fields.id) ? fields.id[0] : fields.id
			const tipo = Array.isArray(fields.tipo) ? fields.tipo[0] : fields.tipo
			const tipoOld = Array.isArray(fields.tipoOld) ? fields.tipoOld[0] : fields.tipoOld
			const titulo = Array.isArray(fields.titulo) ? fields.titulo[0] : fields.titulo
			const descricao = Array.isArray(fields.descricao) ? fields.descricao[0] : fields.descricao
			const url = Array.isArray(fields.url) ? fields.url[0] : fields.url
			const imgFile = Array.isArray(files.img) ? files.img[0] : files.img
			let img: string | undefined
			if (imgFile)
				img = await salvarImagem(imgFile)
			if (id && titulo && tipo && tipoOld && descricao && url && (tipo === 'web' || tipo === 'outros' || tipo === 'legados') && (tipoOld === 'web' || tipoOld === 'outros' || tipoOld === 'legados')) {
				await editarPagina(id, tipo, tipoOld, titulo, descricao, url, img)
				return 'Editado com Sucesso'
			}
			throw 'Erro ao editar auditório'
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

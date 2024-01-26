export default defineEventHandler(async (event) => {
	try {
		const { url, tipo } = (await readBody(event)) as {
			url: string
			tipo: 'web' | 'outros' | 'legados'
		}
		if (tipo === 'web')
			return await fetchPagina(url, tipo)
		if (tipo === 'outros')
			return await fetchPagina(url, tipo)
		if (tipo === 'legados')
			return await fetchPagina(url, tipo)
	}
	catch (e) {
		if (e && typeof e === 'string')
			throw createError({ statusCode: 500, message: e, statusMessage: 'Erro no servidor' })
		if (e && typeof e === 'object' && 'statusCode' in e && 'message' in e && 'statusMessage' in e) {
			if (typeof e.statusCode === 'number' && typeof e.message === 'string' && typeof e.statusMessage === 'string') {
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

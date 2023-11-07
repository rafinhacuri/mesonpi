export default defineEventHandler(async (event) => {
	try {
		const { tipo } = (await readBody(event)) as { tipo: 'web' | 'outros' | 'legados' }
		if (['web', 'outros', 'legados'].includes(tipo)) {
			const paginas = await fetchPaginas(tipo)
			return paginas
		}
		else {
			throw new Error('Tipo inválido. Deve ser \'web\', \'outros\' ou \'legados\'.')
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

export default defineEventHandler(async (event) => {
	try {
		const { user } = event.context
		if (user !== null) {
			const { id, tipo } = (await readBody(event)) as {
				id: string
				tipo: 'web' | 'outros' | 'legados'
			}
			if (!['web', 'outros', 'legados'].includes(tipo))
				throw new Error('Tipo inválido. Deve ser "web", "outros" ou "legados".')

			await excluirPagina(id, tipo)
			return 'pagina excluida com susseso!'
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

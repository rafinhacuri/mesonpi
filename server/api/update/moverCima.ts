import type { Document } from 'mongoose'

export default defineEventHandler(async (event) => {
	try {
		const { user } = event.context
		const { id, tipo } = (await readBody(event)) as {
			id: string
			tipo: 'web' | 'outros' | 'legados'
		}
		let objeto: Document & Pagina | null = null
		let objetoAnterior: Document & Pagina | null = null
		if (user !== null) {
			if (tipo === 'web') {
				objeto = await Web.findById(id)
				if (objeto)
					objetoAnterior = await Web.findOne({ ordem: objeto.ordem - 1 })
			}

			else if (tipo === 'outros') {
				objeto = await Outro.findById(id)
				if (objeto)
					objetoAnterior = await Outro.findOne({ ordem: objeto.ordem - 1 })
			}

			else if (tipo === 'legados') {
				objeto = await Legado.findById(id)
				if (objeto)
					objetoAnterior = await Legado.findOne({ ordem: objeto.ordem - 1 })
			}

			if (objeto && objetoAnterior) {
				objeto.ordem--
				await objeto.save()
				objetoAnterior.ordem++
				await objetoAnterior.save()
				return 'Ordem Alterada com Sucesso'
			}

			return 'Página não Pode ser movida'
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

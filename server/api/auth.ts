import { verifySha512 } from 'ldap-sha512'
import jwt from 'jsonwebtoken'

const { JWT } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
	try {
		const { user, password } = (await readBody(event)) as {
			user: string
			password: string
		}
		if (await baixarUsuario(user)) {
			const senhasUsuario = await baixarSenhasUsuarios(user)
			if (verifySha512(password, senhasUsuario)) {
				const grupo = limparMembros(await baixarGrupo())
				if (verificarUsuario(user, grupo)) {
					return {
						token: jwt.sign({ usuario: user }, JWT, { expiresIn: '8h' }),
						valido: true,

					}
				}
			}
		}
		throw {
			statusCode: 401,
			statusMessage: 'Nao autorizado',
			message: 'Usuario e/ou Senha inválidos',
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

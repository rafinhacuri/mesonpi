import jwt from 'jsonwebtoken'

const { JWT } = useRuntimeConfig()

export default defineEventHandler(async (event) => {
	let decodedToken: { usuario: string } | null = null
	const userCookie = getCookie(event, 'user') || ''
	if (userCookie) {
		const token = JSON.parse(userCookie).token
		if (token)
			decodedToken = await decodeToken(token)
	}
	if (decodedToken)
		event.context.user = decodedToken
	else
		event.context.user = null
})

function decodeToken(tokenCrypt: string): Promise<{ usuario: string } | null> {
	return new Promise((resolve) => {
		jwt.verify(tokenCrypt, JWT, (err, decoded) => {
			if (!err && decoded)
				return resolve(decoded as { usuario: string })
			return resolve(null)
		})
	})
}

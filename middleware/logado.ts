export default defineNuxtRouteMiddleware(async () => {
	const logado = await useCheckAuth()
	if (logado)
		return navigateTo('/admin')
})

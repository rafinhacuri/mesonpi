export default defineNuxtRouteMiddleware(async () => {
	const logado = await useCheckAuth()
	if (logado)
		return

	userStore().clearUserState()
	return navigateTo('/login')
})

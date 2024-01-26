export default defineStore(
	'user',
	() => {
		const token = ref('')
		const isLoggedIn = ref(false)

		const setUserState = (tokenV: string, isLoggedInV: boolean) => {
			token.value = tokenV
			isLoggedIn.value = isLoggedInV
		}

		const clearUserState = () => {
			token.value = ''
			isLoggedIn.value = false
		}

		return { token, isLoggedIn, setUserState, clearUserState }
	},
	{ persist: true },
)

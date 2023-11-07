<script setup lang="ts">
definePageMeta({
	middleware: 'logado',
})
const email = ref('')
const senha = ref('')
const toast = useToast()
async function verify() {
	if (email.value === '' || senha.value === '') {
		return toast.add({
			description: 'Erro',
			icon: 'i-heroicons-exclamation-triangle-20-solid',
			title: `Preencha os dados de login`,
			color: 'red',
		})
	}
	const retorno = await $fetch('/api/auth', {
		method: 'post',
		body: { user: email.value, password: senha.value },
	}).catch((err) => {
		if (err) {
			const { statusCode, statusMessage, message } = err
			toast.add({
				description: message,
				icon: 'i-heroicons-exclamation-triangle-20-solid',
				title: `erro ${statusCode} - ${statusMessage}`,
				color: 'red',
			})
		}
	})
	if (retorno && retorno.valido) {
		userStore().setUserState(retorno.token, true)
		navigateTo('/admin')
	}
}
</script>

<template>
	<section
		class="min-h-[calc(100vh-131px)] bg-[url('/fundo.jpg')] bg-cover bg-center bg-no-repeat"
	>
		<div class="flex flex-col items-center justify-center px-6 mx-auto min-h-[calc(100vh-131px)]">
			<div
				class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700"
			>
				<div class="p-6 space-y-4 md:space-y-6 sm:p-8">
					<h1
						class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white ms-2"
					>
						Mesonpi - Login
					</h1>
					<div class="space-y-4 md:space-y-6">
						<div>
							<label
								for="email"
								class="block mb-2 text-sm font-medium text-gray-900 ms-2 dark:text-white"
							>ID CBPF ou Email</label>
							<UInput
								id="email"
								v-model="email"
								icon="i-heroicons-envelope"
								size="lg"
								color="white"
								@keydown.enter="verify"
							/>
						</div>
						<div>
							<label
								for="senha"
								class="block mb-2 text-sm font-medium text-gray-900 ms-2 dark:text-white"
							>Senha</label>
							<UInput
								id="senha"
								v-model="senha"
								icon="i-heroicons-key"
								size="lg"
								color="white"
								type="password"
								@keydown.enter="verify"
							/>
						</div>
						<NuxtLink
							to="https://id.cbpf.br/"
							target="_blank"
							class="text-[12px] dark:text-slate-400 text-slate-700 float-right pb-2"
						>
							Esqueceu sua Senha
						</NuxtLink>
						<UButton
							icon="i-heroicons-arrow-left-on-rectangle"
							variant="solid"
							label="Entrar"
							class="p-3 tracking-wider uppercase"
							@click="verify"
						/>
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

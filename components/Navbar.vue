<script setup lang="ts">
const message = ref('')
const fullMessage = 'Bem-Vindo a nova Mesonpi!'
let index = 0

function sair() {
	userStore().clearUserState()
	return navigateTo('/login')
}
const logado = await useCheckAuth()

const router = useRouter()

const isadminPage = computed(() => router.currentRoute.value.path === '/admin')
const isLoginPage = computed(() => router.currentRoute.value.path === '/login')
const isIndexPage = computed(() => router.currentRoute.value.path === '/')

onMounted(() => {
	const typeWriter = setInterval(() => {
		if (index < fullMessage.length) {
			message.value += fullMessage.charAt(index)
			index++
		}
		else {
			clearInterval(typeWriter)
		}
	}, 49)
})

const colorMode = useColorMode()
const isDark = computed({
	get() {
		return colorMode.value === 'dark'
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark'
	},
})

function ScrollToDiv(targetId: string) {
	const targetDiv = document.getElementById(`${targetId}`)
	if (targetDiv)
		scrollTo({ top: targetDiv.offsetTop - 65, behavior: 'smooth' })
}
</script>

<template>
	<div class="dark:bg-slate-950 bg-white flex flex-wrap justify-between pb-4 top-0 !h-[65px]">
		<div class="flex items-center mt-4 ml-3 space-x-3">
			<NuxtLink
				:to="isadminPage ? '/' : 'https://cbpf.br'"
				:external="!isadminPage"
				:target="!isadminPage ? '_blank' : '_self'"
				class="flex items-center"
			>
				<ClientOnly>
					<img
						v-if="isDark"
						src="~/assets/images/cbpf-white.svg"
						class="h-8 mr-3"
						alt="Logo do Centro Brasileiro de Pesquisas Físicas"
					>
					<img
						v-else
						src="~/assets/images/cbpf-color.svg"
						class="h-8 mr-3"
						alt="Logo do Centro Brasileiro de Pesquisas Físicas"
					>
					<template #fallback>
						<USkeleton
							class="w-8 h-8 mr-3"
							:ui="{ rounded: 'rounded-full', background: 'bg-gray-300 dark:bg-gray-600' }"
						/>
					</template>
				</ClientOnly>
				<span class="self-center text-2xl font-semibold whitespace-nowrap dark:text-white pt-0.7">CBPF</span>
			</NuxtLink>
			<div v-if="isIndexPage || isLoginPage" class="h-7">
				<p class="text-black dark:text-white text-lg min-h-[1.5rem]">
					{{ message }}
				</p>
			</div>
		</div>
		<div class="mr-3">
			<nav>
				<ol class="flex items-center pt-4 space-x-4 text-black text-xg dark:text-white">
					<li
						class="transition-all duration-500 ease-in-out rounded-md hover:bg-slate-300 dark:hover:bg-slate-500"
					>
						<ClientOnly>
							<UButton
								:icon="isDark ? 'i-heroicons-moon-20-solid' : 'i-heroicons-sun-20-solid'"
								color="black"
								variant="ghost"
								aria-label="mudar tema"
								@click="isDark = !isDark"
							/>
							<template #fallback>
								<USkeleton
									class="w-8 h-8 mr-3"
									:ui="{ rounded: 'rounded-full', background: 'bg-gray-300 dark:bg-gray-600' }"
								/>
							</template>
						</ClientOnly>
					</li>
					<li
						v-if="(logado && isIndexPage) || isadminPage"
						class="transition-all duration-500 ease-in-out rounded-md hover:bg-slate-300 dark:hover:bg-slate-500"
					>
						<UButton
							icon="i-heroicons-arrow-left-on-rectangle"
							color="black"
							variant="ghost"
							aria-label="deslogar"
							@click="sair"
						/>
					</li>
					<li
						v-if="isIndexPage"
						class="transition-all duration-500 ease-in-out rounded-md cursor-pointer dark:hover:bg-slate-500 hover:bg-slate-300 hover:shadow-md hover:px-2"
					>
						<span @click="ScrollToDiv('equipeWeb')">Equipe WEB</span>
					</li>
					<li
						v-if="isIndexPage"
						class="transition-all duration-500 ease-in-out rounded-md cursor-pointer dark:hover:bg-slate-500 hover:bg-slate-300 hover:shadow-md hover:px-2"
					>
						<span @click="ScrollToDiv('outrosProjetos')">Outros</span>
					</li>
					<li
						v-if="isIndexPage"
						class="transition-all duration-500 ease-in-out rounded-md cursor-pointer dark:hover:bg-slate-500 hover:bg-slate-300 hover:shadow-md hover:px-2"
					>
						<span @click="ScrollToDiv('projetosLegados')">Legados</span>
					</li>
				</ol>
			</nav>
		</div>
	</div>
</template>

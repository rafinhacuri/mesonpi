<script setup lang="ts">
defineOgImageComponent('Og', {
	title: `Mesonpi | CBPF`,
	description: 'Explore nossa coleção de sites que destacam a pesquisa de ponta, educação e divulgação científica do Centro Brasileiro de Pesquisas Físicas (CBPF). Descubra o mundo da física e seu impacto em nossa sociedade.',
})

const { data: Web, error } = await useFetch('/api/fetch/paginas', {
	method: 'post',
	body: { tipo: 'web' },
})
if (error.value) {
	const err = (error.value as any).data
	if (err) {
		const { statusCode, statusMessage, message } = err
		throw createError({ statusCode, statusMessage, message })
	}
}
const { data: Legados, error: erroLegados } = await useFetch('/api/fetch/paginas', {
	method: 'post',
	body: { tipo: 'legados' },
})
if (erroLegados.value) {
	const err = (erroLegados.value as any).data
	if (err) {
		const { statusCode, statusMessage, message } = err
		throw createError({ statusCode, statusMessage, message })
	}
}
const { data: Outros, error: erroOutros } = await useFetch('/api/fetch/paginas', {
	method: 'post',
	body: { tipo: 'outros' },
})
if (erroOutros.value) {
	const err = (erroOutros.value as any).data
	if (err) {
		const { statusCode, statusMessage, message } = err
		throw createError({ statusCode, statusMessage, message })
	}
}

if (process.client) {
	window.addEventListener('scroll', () => {
		const btnScrollTop = document.getElementById('scrollTop')
		if (btnScrollTop) {
			if (window.pageYOffset === 0)
				btnScrollTop.style.opacity = '0'
			else btnScrollTop.style.opacity = '100%'
		}
	})
}

function ScrollTopDiv() {
	scrollTo({ top: 0 - 65, behavior: 'smooth' })
}
</script>

<template>
	<div class="pb-6 bg-white dark:bg-slate-900">
		<div v-if="Array.isArray(Web)" id="equipeWeb">
			<Cards titulo-area="Equipe WEB" :items="Web" />
		</div>
		<div v-if="Array.isArray(Outros)" id="outrosProjetos">
			<Cards titulo-area="Outros Projetos" :items="Outros" />
		</div>
		<div v-if="Array.isArray(Legados)" id="projetosLegados">
			<Cards titulo-area="Projetos Legados" :items="Legados" />
		</div>
		<UButton
			id="scrollTop"
			color="blue"
			class="fixed z-50 transition-opacity ease-in-out rounded-full opacity-0 animate-bounce bottom-5 right-5"
			variant="solid"
			icon="i-heroicons-arrow-small-up-solid"
			@click="ScrollTopDiv"
		/>
	</div>
</template>

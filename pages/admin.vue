<script setup lang="ts">
definePageMeta({
	middleware: 'is-authenticated',
})
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
	<section>
		<Lista />
		<UButton
			id="scrollTop"
			color="blue"
			class="fixed z-50 transition-opacity ease-in-out rounded-full opacity-0 animate-bounce bottom-5 right-5"
			variant="solid"
			icon="i-heroicons-arrow-small-up-solid"
			@click="ScrollTopDiv"
		/>
	</section>
</template>

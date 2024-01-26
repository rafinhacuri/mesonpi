<script setup lang="ts">
const { tituloArea, items } = defineProps({
	tituloArea: { type: String, required: true },
	items: {
		type: Array as () => {
			_id: string
			img: string
			titulo: string
			descricao: string
			ordem: number
			url: string
		}[],
		required: true,
	},
})

const q = ref('')

const filteredItems = computed(() => {
	if (!q.value)
		return items

	return items.filter((item) => {
		return String(item.titulo).toLowerCase().includes(q.value.toLowerCase())
	})
})
</script>

<template>
	<p class="pt-8 mb-8 text-3xl font-semibold text-center text-black dark:text-white">
		{{ tituloArea }}
	</p>

	<div class="flex px-3 py-3.5 border-b border-gray-200 dark:border-gray-700">
		<UInput
			v-model="q" icon="i-heroicons-magnifying-glass-20-solid"
			size="sm"
			color="white"
			:trailing="false"
			placeholder="Busca..."
		/>
	</div>

	<div
		class="p-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 place-items-center"
	>
		<div
			v-for="item in filteredItems" :key="item.ordem"
			class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
		>
			<NuxtLink :to="item.url" external target="_blank" class="w-full relative pb-[75%]">
				<img
					class="rounded-t-lg cursor-pointer"
					:src="`/projetos/img?f=${item.img}`"
					:alt="item.titulo"
					loading="lazy"
				>
			</NuxtLink>
			<div class="p-5 space-y-5">
				<h5
					class="mb-2 text-2xl font-bold tracking-tight text-gray-900 cursor-pointer dark:text-white text-center"
				>
					{{ item.titulo }}
				</h5>
				<p class="mb-3 font-normal text-gray-700 dark:text-gray-400 text-center">
					{{ item.descricao }}
				</p>
				<div class="text-center">
					<UButton
						icon="i-heroicons-arrow-right"
						class="hover:bg-slate-300 dark:hover:bg-slate-950"
						size="sm"
						variant="outline"
						color="blue"
						label="ACESSAR"
						trailing
						:to="item.url"
						target="_blank"
					/>
				</div>
			</div>
		</div>
	</div>
</template>

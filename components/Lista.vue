<script setup lang="ts">
const {
	data: Web,
	error,
	refresh: webRefresh,
} = await useFetch('/api/fetch/paginas', { method: 'post', body: { tipo: 'web' } })
if (error.value) {
	const err = (error.value as any).data
	if (err) {
		const { statusCode, statusMessage, message } = err
		throw createError({ statusCode, statusMessage, message })
	}
}
const {
	data: Legados,
	error: erroLegados,
	refresh: legadosRefresh,
} = await useFetch('/api/fetch/paginas', { method: 'post', body: { tipo: 'legados' } })
if (erroLegados.value) {
	const err = (erroLegados.value as any).data
	if (err) {
		const { statusCode, statusMessage, message } = err
		throw createError({ statusCode, statusMessage, message })
	}
}
const {
	data: Outros,
	error: erroOutros,
	refresh: outrosRefresh,
} = await useFetch('/api/fetch/paginas', { method: 'post', body: { tipo: 'outros' } })
if (erroOutros.value) {
	const err = (erroOutros.value as any).data
	if (err) {
		const { statusCode, statusMessage, message } = err
		throw createError({ statusCode, statusMessage, message })
	}
}

function refreshAll() {
	webRefresh()
	outrosRefresh()
	legadosRefresh()
}

const tipos = computed(() => {
	const tipos: { nome: string, titulo: string, items: Pagina[] | null }[] = [
		{ nome: 'web', titulo: ' Equipe WEB', items: null },
		{ nome: 'outros', titulo: 'Outros Projetos', items: null },
		{ nome: 'legados', titulo: 'Projetos Legados', items: null },
	]

	tipos[0].items = Web.value as Pagina[] | null
	tipos[1].items = Outros.value as Pagina[] | null
	tipos[2].items = Legados.value as Pagina[] | null

	return tipos
})

const q = ref('')
const filteredItems = computed(() => {
	return tipos.value.map((tipo) => {
		if (!q.value) {
			return { ...tipo, filteredItems: tipo.items || [] }
		}
		else {
			const filtered = (tipo.items || []).filter(item =>
				String(item.titulo).toLowerCase().includes(q.value.toLowerCase()),
			)
			return { ...tipo, filteredItems: filtered }
		}
	})
})

const newTitulo = ref('')
const newTipo = ref('')
const newDescricao = ref('')
const newUrl = ref('')
const newPhoto = ref<File | null>(null)

const photoUrlAdd = ref('')
function pegarImagemAdd(e: Event) {
	if (e.target) {
		const target = e.target as HTMLInputElement
		if (target.files) {
			newPhoto.value = target.files[0]
			if (newPhoto.value)
				photoUrlAdd.value = URL.createObjectURL(newPhoto.value)
		}
	}
}
const showAdd = ref(false)
async function confirmAdd() {
	if (newTitulo.value === '') {
		return toast.add({
			description: 'Preencha o titulo da pagina',
			icon: 'i-heroicons-exclamation-triangle-20-solid',
			title: 'Erro',
			color: 'red',
		})
	}
	else if (newTipo.value === '') {
		return toast.add({
			description: 'Preencha o tipo da pagina',
			icon: 'i-heroicons-exclamation-triangle-20-solid',
			title: 'Erro',
			color: 'red',
		})
	}
	else if (newDescricao.value === '') {
		return toast.add({
			description: 'Preencha o descrição da pagina',
			icon: 'i-heroicons-exclamation-triangle-20-solid',
			title: 'Erro',
			color: 'red',
		})
	}
	else if (newUrl.value === '') {
		return toast.add({
			description: 'Preencha o url da pagina',
			icon: 'i-heroicons-exclamation-triangle-20-solid',
			title: 'Erro',
			color: 'red',
		})
	}
	else if (newPhoto.value === null) {
		return toast.add({
			description: 'Preencha o foto da pagina',
			icon: 'i-heroicons-exclamation-triangle-20-solid',
			title: 'Erro',
			color: 'red',
		})
	}
	else {
		const formData = new FormData()
		formData.append('tipo', newTipo.value)
		formData.append('titulo', newTitulo.value)
		formData.append('descricao', newDescricao.value)
		formData.append('url', newUrl.value)
		if (newPhoto.value)
			formData.append('img', newPhoto.value)

		const data = await $fetch(`/projetos/api/insert/paginas`, {
			method: 'post',
			body: formData,
		}).catch((err) => {
			if (err) {
				const { statusCode, statusMessage, message } = err
				return toast.add({
					description: message,
					icon: 'i-heroicons-exclamation-triangle-20-solid',
					title: `erro ${statusCode} - ${statusMessage}`,
					color: 'red',
				})
			}
		})
		if (data === 'Pagina Criada com Sucesso!') {
			showAdd.value = false
			refreshAll()
			return toast.add({
				description: 'Pagina adicionada com sucesso',
				icon: 'i-heroicons-archive-box-arrow-down-solid',
				title: 'Adicionada',
				color: 'green',
			})
		}
	}
}

watch(showAdd, (nv) => {
	if (!nv) {
		newTitulo.value = ''
		newTipo.value = ''
		newDescricao.value = ''
		newUrl.value = ''
		newPhoto.value = null
		photoUrlAdd.value = ''
	}
})

const toast = useToast()

const showdelete = ref(false)
const currentIDDelete = ref('')
const currentTipoDelete = ref('')

function deleteItem(id: string, tipo: string) {
	currentIDDelete.value = id
	currentTipoDelete.value = tipo
	showdelete.value = true
}
async function confirmDelete() {
	const data = await $fetch(`/projetos/api/delete/paginas`, {
		method: 'post',
		body: { id: currentIDDelete.value, tipo: currentTipoDelete.value },
	}).catch((err) => {
		if (err) {
			const { statusCode, statusMessage, message } = err
			return toast.add({
				description: message,
				icon: 'i-heroicons-exclamation-triangle-20-solid',
				title: `erro ${statusCode} - ${statusMessage}`,
				color: 'red',
			})
		}
	})
	if (data === 'pagina excluida com susseso!') {
		showdelete.value = false
		refreshAll()
		return toast.add({
			description: 'Pagina excluida com sucesso',
			icon: 'i-heroicons-archive-box-x-mark-solid',
			title: 'Excluida',
			color: 'green',
		})
	}
}

const showEdit = ref(false)
const currentIDEdit = ref('')
const currentTipoEdit = ref('')
const currentTipoOldEdit = ref('')
const currentTituloEdit = ref('')
const currentdescricaoEdit = ref('')
const currentUrlEdit = ref('')
const currentFotoEdit = ref('')
const newFotoEdit = ref<File | null>(null)
const photoUrl = ref('')
function pegarImagem(e: Event) {
	if (e.target) {
		const target = e.target as HTMLInputElement
		if (target.files) {
			newFotoEdit.value = target.files[0]
			if (newFotoEdit.value)
				photoUrl.value = URL.createObjectURL(newFotoEdit.value)
		}
	}
}
function editItem(id: string, tipo: string, titulo: string, descricao: string, url: string, foto: string) {
	currentIDEdit.value = id
	currentTipoEdit.value = tipo
	currentTipoOldEdit.value = tipo
	currentTituloEdit.value = titulo
	currentdescricaoEdit.value = descricao
	currentUrlEdit.value = url
	currentFotoEdit.value = foto

	showEdit.value = true
}

async function confirmEdit() {
	const formData = new FormData()
	formData.append('id', currentIDEdit.value)
	formData.append('tipo', currentTipoEdit.value)
	formData.append('tipoOld', currentTipoOldEdit.value)
	formData.append('titulo', currentTituloEdit.value)
	formData.append('descricao', currentdescricaoEdit.value)
	formData.append('url', currentUrlEdit.value)
	if (newFotoEdit.value)
		formData.append('img', newFotoEdit.value)

	const data = await $fetch(`/projetos/api/update/paginas`, {
		method: 'post',
		body: formData,
	}).catch((err) => {
		if (err) {
			const { statusCode, statusMessage, message } = err
			return toast.add({
				description: message,
				icon: 'i-heroicons-exclamation-triangle-20-solid',
				title: `erro ${statusCode} - ${statusMessage}`,
				color: 'red',
			})
		}
	})
	if (data === 'Editado com Sucesso') {
		showEdit.value = false
		refreshAll()
		return toast.add({
			description: 'Pagina editada com sucesso',
			icon: 'i-heroicons-arrow-path-rounded-square',
			title: 'Editada',
			color: 'green',
		})
	}
}

watch(showEdit, (nv) => {
	if (!nv) {
		currentTituloEdit.value = ''
		newFotoEdit.value = null
		currentIDEdit.value = ''
		currentTipoEdit.value = ''
		currentTipoOldEdit.value = ''
		currentdescricaoEdit.value = ''
		currentUrlEdit.value = ''
		photoUrl.value = ''
	}
})

async function moverPraCima(id: string, tipo: string) {
	const res = await $fetch('/api/update/moverCima', { method: 'POST', body: { id, tipo } })
	if (res) {
		refreshAll()
		return toast.add({
			description: res,
			icon: 'i-heroicons-arrow-path-rounded-square',
			title: 'Editada',
			color: 'green',
		})
	}
}

async function moverPraBaixo(id: string, tipo: string) {
	const res = await $fetch('/api/update/moverBaixo', { method: 'POST', body: { id, tipo } })
	if (res) {
		refreshAll()
		return toast.add({
			description: res,
			icon: 'i-heroicons-arrow-path-rounded-square',
			title: 'Editada',
			color: 'green',
		})
	}
}
</script>

<template>
	<div class="dark:bg-slate-900 bg-slate-100">
		<div class="flex justify-between pt-4">
			<UInput
				v-model="q" icon="i-heroicons-magnifying-glass-20-solid"
				size="sm"
				color="white"
				:trailing="false"
				placeholder="Busca..."
				class="ml-3"
			/>
			<UButton
				class="transition-all duration-500 ease-in-out rounded-md hover:bg-slate-300 dark:hover:bg-slate-500"
				icon="i-heroicons-plus-circle-20-solid"
				color="black"
				variant="ghost"
				aria-label="adicionar novo"
				@click="showAdd = true"
			/>
		</div>
	</div>
	<div class="dark:bg-slate-900 bg-slate-100">
		<div v-for="tipo in filteredItems" :key="tipo.titulo">
			<p
				id="equipeWeb"
				class="pt-6 mb-8 text-3xl font-semibold text-center text-black dark:text-white"
			>
				{{ tipo.titulo }}
			</p>
			<div class="overflow-x-auto">
				<table class="w-full table-auto">
					<thead class="text-left text-black dark:bg-slate-900 dark:text-white bg-slate-100">
						<tr>
							<th class="px-4 py-2">
								Título
							</th>
							<th class="px-4 py-2">
								Descrição
							</th>
							<th class="px-4 py-2">
								Imagem
							</th>
							<th class="px-4 py-2">
								URL
							</th>
							<th class="px-4 py-2">
								Ações
							</th>
						</tr>
					</thead>
					<tbody v-if="tipo.filteredItems">
						<tr
							v-for="item in tipo.filteredItems" :key="item._id"

							class="text-sm text-left text-black border-b border-gray-300 dark:border-gray-600 dark:text-gray-300"
						>
							<td class="px-4 py-2">
								{{ item.titulo }}
							</td>
							<td class="px-4 py-2">
								{{ item.descricao }}
							</td>

							<td class="px-4 py-2">
								<div class="w-2 flex justify-between items-start pl-3.5">
									<UPopover mode="hover">
										<UButton
											variant="ghost"
											color="blue"
											class="hover:bg-slate-200"
											trailing-icon="i-heroicons-eye-solid"
										/>
										<template #panel>
											<img
												class="h-48 w-66"
												:src="`/projetos/img?f=${item.img}`"
												:alt="item.titulo"
											>
										</template>
									</UPopover>
								</div>
							</td>
							<td class="px-4 py-2">
								<NuxtLink :to="item.url" external target="_blank">
									{{ item.url }}
								</NuxtLink>
							</td>
							<td class="px-4 py-2">
								<UButtonGroup size="sm" orientation="horizontal">
									<UButton
										class="hover:bg-slate-200"
										icon="i-heroicons-pencil-square"
										size="sm"
										color="blue"
										variant="ghost"
										trailing-icon="false"
										@click="
											editItem(item._id, tipo.nome, item.titulo, item.descricao, item.url, item.img)
										"
									/>
									<UButton
										class="hover:bg-slate-200"
										icon="i-heroicons-trash-solid"
										size="sm"
										color="red"
										variant="ghost"
										trailing-icon="false"
										@click="deleteItem(item._id, tipo.nome)"
									/>
								</UButtonGroup>
								<UButtonGroup size="2xs" orientation="vertical">
									<UButton
										class="hover:bg-slate-200"
										icon="i-heroicons-arrow-small-up-20-solid"
										size="2xs"
										color="white"
										variant="ghost"
										trailing-icon="false"
										@click="moverPraCima(item._id, tipo.nome)"
									/>
									<UButton
										class="hover:bg-slate-200"
										icon="i-heroicons-arrow-small-down-20-solid"
										size="2xs"
										color="white"
										variant="ghost"
										trailing-icon="false"
										@click="moverPraBaixo(item._id, tipo.nome)"
									/>
								</UButtonGroup>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<UModal v-model="showdelete" title="Confirmação">
		<div class="pt-16 pb-16 text-center bg-slate-300 dark:bg-slate-900">
			<p class="pb-6 text-xl">
				Tem certeza que deseja excluir a página ?
			</p>
			<div class="space-x-9">
				<UButton class="text-lg" color="green" label="confirmar" @click="confirmDelete" />
				<UButton class="text-lg" color="red" label="cancelar" @click="showdelete = false" />
			</div>
		</div>
	</UModal>
	<UModal v-model="showEdit" title="Confirmação">
		<div
			id="page-form"
			class="px-8 pt-6 pb-8 mb-4 space-y-4 rounded shadow-md bg-slate-300 dark:bg-slate-900"
		>
			<div class="mb-4">
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="title">Titulo</label>
				<input
					id="title"
					v-model="currentTituloEdit"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="text"
					name="title"
					placeholder="Digite o Titulo"
				>
			</div>
			<div class="mb-4">
				<label
					class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900"
					for="descricao"
				>Descrição</label>
				<input
					id="descricao"
					v-model="currentdescricaoEdit"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="text"
					name="descricao"
					placeholder="Digite uma breve descrição do site"
				>
			</div>
			<div class="mb-4">
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="link">Link</label>
				<input
					id="link"
					v-model="currentUrlEdit"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="url"
					name="link"
					placeholder="Digite o link para o site"
				>
			</div>
			<div class="mb-4">
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="img">Foto</label>
				<input
					id="img"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="file"
					name="img"
					accept="image/*"
					placeholder="Coloque uma foto da pagina do site"
					@change="pegarImagem"
				>

				<div class="flex items-center justify-center">
					<img v-if="photoUrl !== ''" alt="Foto" class="mt-2" :src="photoUrl">
					<img
						v-else-if="currentFotoEdit"
						:src="`/projetos/img?f=${currentFotoEdit}`"
						:alt="currentTituloEdit"
						class="mt-2"
					>
				</div>
			</div>
			<div>
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="type">Tipo:</label>
				<select
					id="type"
					v-model="currentTipoEdit"
					class="w-full px-3 py-2 leading-tight border rounded shadow dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
				>
					<option value="">
						Selecione um tipo...
					</option>
					<option value="web">
						web
					</option>
					<option value="outros">
						outros
					</option>
					<option value="legados">
						legados
					</option>
				</select>
			</div>
			<div class="pb-6 text-center space-x-9">
				<UButton class="text-lg" color="green" label="confirmar" @click="confirmEdit" />
				<UButton class="text-lg" color="red" label="cancelar" @click="showEdit = false" />
			</div>
		</div>
	</UModal>
	<UModal v-model="showAdd" title="Confirmação">
		<div
			id="page-form"
			class="px-8 pt-6 pb-8 mb-4 space-y-4 rounded shadow-md bg-slate-300 dark:bg-slate-900"
		>
			<div class="mb-4">
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="nome">Titulo</label>
				<input
					id="title"
					v-model="newTitulo"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="text"
					name="title"
					placeholder="Digite o Titulo"
				>
			</div>
			<div class="mb-4">
				<label
					class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900"
					for="descricao"
				>Descrição</label>
				<input
					id="descricao"
					v-model="newDescricao"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="text"
					name="descricao"
					placeholder="Digite uma breve descrição do site"
				>
			</div>
			<div class="mb-4">
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="link">Link</label>
				<input
					id="link"
					v-model="newUrl"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="url"
					name="link"
					placeholder="Digite o link para o site"
				>
			</div>
			<div class="mb-4">
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="photo">Foto</label>
				<input
					id="photo"
					class="w-full px-3 py-2 leading-tight border rounded shadow appearance-none dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
					type="file"
					name="photo"
					accept="image/*"
					placeholder="Coloque uma foto da pagina inicial do site"
					@change="pegarImagemAdd"
				>
				<div class="flex items-center justify-center">
					<img v-if="photoUrlAdd !== ''" alt="Foto" class="mt-2" :src="photoUrlAdd">
				</div>
			</div>
			<div>
				<label class="block mb-2 text-sm font-bold dark:text-slate-200 text-slate-900" for="type">Tipo:</label>
				<select
					id="type"
					v-model="newTipo"
					class="w-full px-3 py-2 leading-tight border rounded shadow dark:text-slate-200 text-slate-900 focus:outline-none focus:shadow-outline"
				>
					<option value="">
						Selecione um tipo...
					</option>
					<option value="web">
						Web
					</option>
					<option value="outros">
						Outros
					</option>
					<option value="legados">
						Legados
					</option>
				</select>
			</div>
			<div class="pb-6 text-center space-x-9">
				<UButton class="text-lg" color="green" label="confirmar" @click="confirmAdd" />
				<UButton class="text-lg" color="red" label="cancelar" @click="showAdd = false" />
			</div>
		</div>
	</UModal>
</template>

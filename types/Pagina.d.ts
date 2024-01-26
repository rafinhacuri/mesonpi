declare global {
	interface Pagina {
		_id: string
		titulo: string
		descricao: string
		url: string
		img: string
		ordem: number
		tipo: 'web' | 'outros' | 'legados'
	}
}

export { Pagina }

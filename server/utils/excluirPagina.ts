import { Erro, Legado, Outro, Web } from './mongoose'

export default (id: string, tipo: 'web' | 'outros' | 'legados') => {
	return new Promise(async (resolve, reject) => {
		if (tipo === 'web' && id) {
			await Web.findByIdAndDelete(id).catch((err) => {
				new Erro({
					erro: {
						info: 'Erro ao excluir pagina do banco de dados',
						err,
					},
				}).save()
				return reject('Erro ao excluir pagina')
			})
			return resolve('Pagina excluida com sucesso')
		}
		else if (tipo === 'outros' && id) {
			await Outro.findByIdAndDelete(id).catch((err) => {
				new Erro({
					erro: {
						info: 'Erro ao excluir pagina do banco de dados',
						err,
					},
				}).save()
				return reject('Erro ao excluir pagina')
			})
			return resolve('Pagina excluida com sucesso')
		}
		else if (tipo === 'legados' && id) {
			await Legado.findByIdAndDelete(id).catch((err) => {
				new Erro({
					erro: {
						info: 'Erro ao excluir pagina do banco de dados',
						err,
					},
				}).save()
				return reject('Erro ao excluir pagina')
			})
			return resolve('Pagina excluida com sucesso')
		}
		else {
			return reject('tipo incorreto')
		}
	})
}

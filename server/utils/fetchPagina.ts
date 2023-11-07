import { Erro, Legado, Outro, Web } from './mongoose'

export default (url: string, tipo: 'web' | 'outros' | 'legados'): Promise<boolean> => {
	return new Promise(async (resolve, reject) => {
		if (url) {
			if (tipo === 'web') {
				const web = await Web.findOne({ url, tipo })
					.sort({ url: 1 })
					.catch((err) => {
						new Erro({
							erro: {
								info: 'Não foi possivel ler as Paginas do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao baixar as Paginas')
					})

				if (web)
					return resolve(true)
				return resolve(false)
			}
			else if (tipo === 'outros') {
				const outro = await Outro.findOne({ url, tipo })
					.sort({ url: 1 })
					.catch((err) => {
						new Erro({
							erro: {
								info: 'Não foi possivel ler as Paginas do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao baixar as Paginas')
					})

				if (outro)
					return resolve(true)
				return resolve(false)
			}
			else if (tipo === 'legados') {
				const legado = await Legado.findOne({ url, tipo })
					.sort({ url: 1 })
					.catch((err) => {
						new Erro({
							erro: {
								info: 'Não foi possivel ler as Paginas do banco de dados',
								err,
							},
						}).save()
						return reject('Erro ao baixar as Paginas')
					})

				if (legado)
					return resolve(true)
				return resolve(false)
			}
			else {
				return reject('URL invalida')
			}
		}
	})
}

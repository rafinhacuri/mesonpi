import mongoose from 'mongoose'

const { Schema } = mongoose
const { MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = useRuntimeConfig()

mongoose.connect(MONGO_URL, {
	tls: false,
	authMechanism: 'SCRAM-SHA-256',
	auth: {
		username: MONGO_USERNAME,
		password: MONGO_PASSWORD,
	},
	dbName: MONGO_DB_NAME,
})

export const Erro = mongoose.model(
	'erro',
	new Schema({
		erro: { type: Object, required: true },
		data: { type: Date, default: new Date() },
	}),
)

export const Web = mongoose.model(
	'web',
	new Schema<Pagina>({
		titulo: { type: String, required: true },
		descricao: String,
		url: { type: String, required: true },
		img: { type: String, required: true },
		tipo: { type: String, required: true },
	}),
)

export const Legado = mongoose.model(
	'legado',
	new Schema<Pagina>({
		titulo: { type: String, required: true },
		descricao: String,
		url: { type: String, required: true },
		img: { type: String, required: true },
		tipo: { type: String, required: true },
	}),
)

export const Outro = mongoose.model(
	'outro',
	new Schema<Pagina>({
		titulo: { type: String, required: true },
		descricao: String,
		url: { type: String, required: true },
		img: { type: String, required: true },
		tipo: { type: String, required: true },
	}),
)

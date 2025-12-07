import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { httpLogger, logger } from './logger'
import servicesRouter from './routes/services'
import agentRouter from './routes/agent'
import { setupVoiceWebSocket } from './routes/voice'

const app = express()
app.use(cors())
app.use(express.json())
app.use(httpLogger)

app.get('/api/health', (req, res) => {
	res.json({ status: 'ok' })
})

app.use('/api/services', servicesRouter)
app.use('/api/agent', agentRouter)

// Accept client logs for observability/audit
app.post('/api/logs', (req, res) => {
	const { level = 'info', ...rest } = req.body || {}
	;(logger as any)[level]?.({ ...rest }) ?? logger.info(rest)
	res.status(204).end()
})

// In production we can serve the client build from here
const clientDist = path.resolve(process.cwd(), '..', 'client', 'dist')
app.use(express.static(clientDist))
app.get('*', (req, res, next) => {
	if (req.path.startsWith('/api/')) return next()
	res.sendFile(path.join(clientDist, 'index.html'))
})

const port = Number(process.env.PORT || 4000)
const server = app.listen(port, () => {
	logger.info({ port }, 'Server listening')
})

// Setup WebSocket for voice
setupVoiceWebSocket(server)



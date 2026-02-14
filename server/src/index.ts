import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import path from 'path'
import { httpLogger, logger } from './logger.js'
import servicesRouter from './routes/services.js'
import agentRouter from './routes/agent.js'
import { setupVoiceWebSocket } from './routes/voice.js'

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
const clientAssets = path.join(clientDist, 'assets')

// Serve versioned assets with long cache and no SPA fallback.
app.use(
	'/assets',
	express.static(clientAssets, {
		fallthrough: false,
		maxAge: '1y',
		immutable: true
	})
)

// Serve other static files from dist.
app.use(
	express.static(clientDist, {
		maxAge: 0
	})
)

// Avoid serving index.html for favicon when no favicon file exists.
app.get('/favicon.ico', (req, res) => {
	res.status(204).end()
})

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


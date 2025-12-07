import { Router } from 'express'
import fs from 'fs'
import path from 'path'

const router = Router()

const dataPath = path.resolve(process.cwd(), 'src', 'data', 'services.json')

router.get('/', (req, res) => {
	try {
		const raw = fs.readFileSync(dataPath, 'utf8')
		const data = JSON.parse(raw)
		const list = data.services?.map((s: any) => ({
			id: s.id,
			slug: s.slug,
			title: s.title,
			category: s.category,
			badges: s.badges,
			summary: s.summary
		}))
		return res.json({ services: list ?? [] })
	} catch {
		return res.json({ services: [] })
	}
})

router.get('/:slug', (req, res) => {
	try {
		const raw = fs.readFileSync(dataPath, 'utf8')
		const data = JSON.parse(raw)
		const svc = data.services?.find((s: any) => s.slug === req.params.slug)
		if (!svc) return res.status(404).json({ error: 'Service not found' })
		return res.json({ service: svc })
	} catch {
		return res.status(500).json({ error: 'Failed to read service data' })
	}
})

export default router



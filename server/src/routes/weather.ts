import { Router } from 'express'
import { logger } from '../logger.js'

const router = Router()

router.post('/', async (req, res) => {
	const { latitude, longitude } = req.body

	if (!latitude || !longitude) {
		res.status(400).json({ error: 'latitude and longitude are required' })
		return
	}

	try {
		logger.info({ latitude, longitude }, 'Fetching weather data')

		const response = await fetch(
			'https://jordangate.imagine.com.jo/GetWeatherByCoordinate',
			{
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({ latitude, longitude }),
			}
		)

		if (!response.ok) {
			logger.error(
				{ status: response.status },
				'Weather API returned error'
			)
			res.status(502).json({
				error: 'Weather service unavailable',
				status: response.status,
			})
			return
		}

		const data = await response.json()
		logger.info({ latitude, longitude }, 'Weather data fetched successfully')
		res.json(data)
	} catch (error: any) {
		logger.error({ error: error.message }, 'Failed to fetch weather data')
		res.status(500).json({ error: 'Failed to fetch weather data' })
	}
})

export default router

export type ServiceRoute = {
	slug: string
	path: string
	primarySelector?: string
}

export const serviceRoutes: ServiceRoute[] = [
	{
		slug: 'request-installment-plan',
		path: '/services/request-installment-plan',
		primarySelector: 'h1'
	}
]



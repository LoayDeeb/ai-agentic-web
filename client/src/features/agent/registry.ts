export type ServiceRoute = {
	slug: string
	path: string
	primarySelector?: string
}

export const serviceRoutes: ServiceRoute[] = [
	{
		slug: 'vat-registration-establishments',
		path: '/services/vat-registration-establishments',
		primarySelector: 'h1'
	}
]



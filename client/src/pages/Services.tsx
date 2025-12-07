import React, { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { TopHeaderBar } from '../components/TopHeader'
import { ZATCAHeader } from '../components/ZATCAHeader'
import { ServiceActionsBar } from '../components/ServiceActionsBar'
import { ServicesCount } from '../components/ServicesCount'
import { ServicesHeader } from '../components/ServicesHeader'
import { FilterSidebar } from '../components/FilterSidebar'
import { ServiceFilterSidebar } from '../components/ServiceFilterSidebar'
import { ServiceRequestCard } from '../components/ServiceRequestCard'
import { useLocaleStore } from '../store/locale'

type ServiceListItem = {
	id: string
	slug: string
	title: string
	category: string
	badges?: string[]
	summary?: string
}

export default function Services() {
	const { t } = useTranslation()
	const [services, setServices] = useState<ServiceListItem[]>([])
	const [search, setSearch] = useState('')
	const [sort, setSort] = useState<'asc' | 'desc' | undefined>('asc')
	const navigate = useNavigate()
	const switchLang = useLocaleStore((s) => s.switchLanguage)
	const dir = useLocaleStore((s) => s.dir)

	useEffect(() => {
		document.documentElement.dir = dir
	}, [dir])

	useEffect(() => {
		fetch('/api/services')
			.then((r) => r.json())
			.then((data) => setServices(data.services ?? []))
			.catch(() => setServices([]))
	}, [])

	const filtered = useMemo(() => {
		let list = services
		if (search) {
			const s = search.toLowerCase()
			list = list.filter(
				(x) =>
					x.title.toLowerCase().includes(s) ||
					x.summary?.toLowerCase().includes(s) ||
					x.category?.toLowerCase().includes(s)
			)
		}
		if (sort) {
			list = [...list].sort((a, b) =>
				sort === 'asc'
					? a.title.localeCompare(b.title)
					: b.title.localeCompare(a.title)
			)
		}
		return list
	}, [services, search, sort])

	return (
		<div className="min-h-screen">
			<TopHeaderBar onLanguageSwitch={() => switchLang()} />
			<ZATCAHeader />
			<div className="container mx-auto px-6 py-6">
				{/* Service Actions Bar */}
				<ServiceActionsBar
					title={t('Zakat, Tax and Customs Services')}
					onPrint={() => window.print()}
					onAddToFavorites={() => console.log('Added to favorites')}
				/>

				{/* Search and Sort Controls */}
				<ServicesHeader
					onSearch={(v) => setSearch(v)}
					onSort={(d) => setSort(d)}
					onViewChange={() => {}}
				/>

				{/* Main content area with sidebar and cards */}
				<div className="flex gap-6">
					{/* Left sidebar - Filters */}
					<aside className="w-[300px] flex-shrink-0">
						<ServiceFilterSidebar />
					</aside>

					{/* Right side - Services count and cards */}
					<main className="flex-1">
						<ServicesCount count={filtered.length} label="electronic services" />
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{filtered.map((svc) => (
								<ServiceRequestCard
									key={svc.id}
									title={t(svc.title)}
									description={t(svc.summary || '')}
									badges={svc.badges ?? [svc.category]}
									onLearnMore={() => navigate(`/services/${svc.slug}`)}
									onStart={() => navigate(`/services/${svc.slug}`)}
								/>
							))}
							{filtered.length === 0 && (
								<div className="text-gray-600">No services found.</div>
							)}
						</div>
					</main>
				</div>
			</div>
		</div>
	)
}



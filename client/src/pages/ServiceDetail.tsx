import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Users, Clock, DollarSign, Globe, Calendar, MessageSquare, Monitor } from 'lucide-react'
import { TopHeaderBar } from '../components/TopHeader'
import { ZATCAHeader } from '../components/ZATCAHeader'
import { BreadcrumbSocial } from '../components/BreadcrumbSocial'
import { InstallmentHeader } from '../components/InstallmentHeader'
import { ServiceDescription } from '../components/ServiceDescription'
import { TabNavigation } from '../components/TabNavigation'
import { InfoCardItem } from '../components/InfoCardItem'
import { ServiceChannelsCard } from '../components/ServiceChannelsCard'
import { PaymentChannels } from '../components/PaymentChannels'
import { SupportContactInfo } from '../components/SupportContactInfo'
import { useLocaleStore } from '../store/locale'

type ServiceDetail = {
	id: string
	slug: string
	title: string
	category: string
	summary: string
	badges: string[]
	steps: string[]
	eligibility: string[]
	requiredDocuments: string[]
	meta: {
		audience: string
		duration: string
		cost: string
		channels: string[]
		languages: string[]
		releaseDate: string
		sms: string
		paymentChannels: string[]
	}
}

export default function ServiceDetail() {
	const { t } = useTranslation()
	const { slug } = useParams<{ slug: string }>()
	const navigate = useNavigate()
	const [service, setService] = useState<ServiceDetail | null>(null)
	const [activeTab, setActiveTab] = useState('steps')
	const switchLang = useLocaleStore((s) => s.switchLanguage)
	const dir = useLocaleStore((s) => s.dir)
	const videoRef = React.useRef<HTMLIFrameElement>(null)

	useEffect(() => {
		document.documentElement.dir = dir
	}, [dir])

	// Listen for agent tool events
	useEffect(() => {
		const handler = (e: Event) => {
			const { tool, args } = (e as CustomEvent).detail
			
			if (tool === 'scrollToTab') {
				setActiveTab(args.tabId)
				setTimeout(() => {
					const tabContent = document.querySelector('[role="tab"][aria-selected="true"]')
					tabContent?.scrollIntoView({ behavior: 'smooth', block: 'center' })
				}, 100)
			} else if (tool === 'playVideo') {
				console.log('[ServiceDetail] playVideo called')
				
				// Always switch to steps tab so the iframe is mounted
				setActiveTab('steps')

				const tryPlay = (attempt = 0) => {
					const iframe = videoRef.current
					const win = iframe?.contentWindow
					if (!iframe || !win) {
						console.log(`[ServiceDetail] Waiting for iframe... attempt ${attempt}`)
						// Increase attempts and interval to tolerate slower loads
						if (attempt < 20) {
							return setTimeout(() => tryPlay(attempt + 1), 250)
						}
						console.error('[ServiceDetail] Failed to find iframe after retries')
						return
					}

					// Scroll into view so the user sees the video being "opened"
					iframe.scrollIntoView({ behavior: 'smooth', block: 'center' })

					// Correct YouTube API payload: args must be an array, not a string
					const send = (func: string) => {
						const payload = JSON.stringify({ event: 'command', func, args: [] })
						console.log('[ServiceDetail] Sending to YouTube:', payload)
						win.postMessage(payload, '*')
					}

					// Mute first to pass autoplay policies, then play
					send('mute')
					send('playVideo')

					// Retry a few times in case API wasn't ready yet
					if (attempt < 5) {
						setTimeout(() => {
							send('mute')
							send('playVideo')
						}, 400)
					}
				}

				// Give the tab a moment to mount the iframe
				setTimeout(() => tryPlay(0), 200)
			}
		}
		
		window.addEventListener('agentTool', handler)
		return () => window.removeEventListener('agentTool', handler)
	}, [])

	useEffect(() => {
		fetch(`/api/services/${slug}`)
			.then((r) => r.json())
			.then((data) => setService(data.service))
			.catch(() => setService(null))
	}, [slug])

	if (!service) {
		return (
			<div className="min-h-screen">
				<TopHeaderBar onLanguageSwitch={() => switchLang()} />
				<ZATCAHeader />
				<div className="container mx-auto px-6 py-6">
					<p>Loading service details...</p>
				</div>
			</div>
		)
	}

	return (
		<div className="min-h-screen bg-gray-50">
			<TopHeaderBar onLanguageSwitch={() => switchLang()} />
			<ZATCAHeader />
			<div className="container mx-auto px-6 py-6">
				{/* Breadcrumb and social actions */}
				<BreadcrumbSocial
					breadcrumbs={[
						{ label: t('Home'), href: '/' },
						{ label: t('Zakat, Tax and Customs Services'), href: '/services' }
					]}
					pageTitle={t(service.title)}
					shareTitle={t(service.title)}
				/>

				{/* Two-column layout */}
				<div className="flex gap-8">
					{/* Left column - Main content */}
					<div className="flex-1 max-w-[852px]">
						{/* Header with title and Start button */}
						<InstallmentHeader
							title={t(service.title)}
							buttonText={t('Start now')}
							onButtonClick={() => navigate(`/services/${slug}/submit`)}
						/>

						{/* Badge */}
						{service.badges && service.badges.length > 0 && (
							<div className="mb-4">
								<span className="inline-block bg-[#F9FAFB] text-[#1F2A37] text-sm font-medium border border-[#E5E7EB] rounded px-3 py-1">
									{t(service.badges[0])}
								</span>
							</div>
						)}

						{/* Description */}
						<ServiceDescription description={t(service.summary)} />

						{/* Tabs */}
						<TabNavigation
							tabs={[
								{ id: 'steps', label: t('Steps') },
								{ id: 'eligibility', label: t('Eligibility') },
								{ id: 'documents', label: t('Required Documents') }
							]}
							defaultActiveTab="steps"
							onTabChange={setActiveTab}
						/>

						{/* Tab content */}
						<div className="bg-white border border-gray-200 rounded-lg p-6">
							{activeTab === 'steps' && (
								<div>
									<h3
										className="font-semibold text-lg mb-4"
										style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
									>
										{t('Service Steps')}
									</h3>
									
									{/* YouTube Video Embed */}
									<div className="mb-6">
										<div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
											<iframe
												ref={videoRef}
												className="absolute top-0 left-0 w-full h-full rounded-lg"
												src={`https://www.youtube.com/embed/Vpg245dc3jI?enablejsapi=1&origin=${window.location.origin}&playsinline=1&mute=1`}
												title="Service Tutorial Video"
												frameBorder="0"
												allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
												allowFullScreen
											></iframe>
										</div>
									</div>

									<ol id="service-steps-list" className="list-none space-y-3 pl-0">
										{service.steps.map((step, i) => (
											<li key={i} className="flex gap-3 text-gray-700">
												<span className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-[#1B8354] text-white rounded-full text-sm font-bold">
													{i + 1}
												</span>
												<span className="flex-1">{t(step)}</span>
											</li>
										))}
									</ol>
								</div>
							)}
							{activeTab === 'eligibility' && (
								<div>
									<h3
										className="font-semibold text-lg mb-4"
										style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
									>
										{t('Eligibility')}
									</h3>
									<ul className="list-none space-y-2 pl-0">
										{service.eligibility.map((item, i) => (
											<li key={i} className="flex gap-2 text-gray-700">
												<span className="text-[#1B8354] font-bold">•</span>
												<span>{t(item)}</span>
											</li>
										))}
									</ul>
								</div>
							)}
							{activeTab === 'documents' && (
								<div>
									<h3
										className="font-semibold text-lg mb-4"
										style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
									>
										{t('Required Documents')}
									</h3>
									{service.requiredDocuments.length > 0 &&
									service.requiredDocuments[0] !== 'No Documents' ? (
										<ul className="list-none space-y-2 pl-0">
											{service.requiredDocuments.map((doc, i) => (
												<li key={i} className="flex gap-2 text-gray-700">
													<span className="text-[#1B8354] font-bold">•</span>
													<span>{t(doc)}</span>
												</li>
											))}
										</ul>
									) : (
										<p className="text-gray-600">{t('No Documents')}</p>
									)}
								</div>
							)}
						</div>
					</div>

					{/* Right column - Service info sidebar */}
					<aside className="w-[380px] flex-shrink-0">
						<div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
							<InfoCardItem
								icon={<Users className="w-6 h-6" />}
								title={t('Target Audience')}
								description={service.meta.audience}
							/>

							<InfoCardItem
								icon={<Clock className="w-6 h-6" />}
								title={t('Service Duration')}
								description={service.meta.duration}
							/>

							<InfoCardItem
								icon={<DollarSign className="w-6 h-6" />}
								title={t('Service Cost')}
								description={service.meta.cost}
							/>

							<ServiceChannelsCard
								channels={service.meta.channels.map((ch) => ({
									id: ch.toLowerCase().replace(/\s+/g, ''),
									label: ch,
									active: true
								}))}
							/>

							<InfoCardItem
								icon={<Globe className="w-6 h-6" />}
								title={t('Service Languages')}
								description={service.meta.languages.join(', ')}
							/>

							<InfoCardItem
								icon={<Calendar className="w-6 h-6" />}
								title={t('Service Release Date')}
								description={new Date(service.meta.releaseDate).toLocaleDateString('en-US', {
									year: 'numeric',
									month: 'long',
									day: 'numeric'
								})}
							/>

							<InfoCardItem
								icon={<MessageSquare className="w-6 h-6" />}
								title={t('SMS Service')}
								description={service.meta.sms}
							/>

							{service.meta.paymentChannels && service.meta.paymentChannels.length > 0 && (
								<PaymentChannels
									enabledChannels={{
										sadad: service.meta.paymentChannels.includes('SADAD'),
										mada: service.meta.paymentChannels.some((ch) =>
											ch.toLowerCase().includes('mada')
										),
										visa: service.meta.paymentChannels.some((ch) =>
											ch.toLowerCase().includes('visa')
										)
									}}
								/>
							)}

							<SupportContactInfo />
						</div>
					</aside>
				</div>
			</div>
		</div>
	)
}

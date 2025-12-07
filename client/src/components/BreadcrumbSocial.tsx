import React, { useState } from 'react'
import { ChevronRight, Share2, Printer, Star, Volume2, Mail, Linkedin, Twitter } from 'lucide-react'

type BreadcrumbItem = {
	label: string
	href?: string
}

type BreadcrumbSocialProps = {
	breadcrumbs?: BreadcrumbItem[]
	pageTitle?: string
	onPrint?: () => void
	onFavorite?: () => void
	shareUrl?: string
	shareTitle?: string
}

export const BreadcrumbSocial = ({
	breadcrumbs = [
		{
			label: 'Home',
			href: '#'
		},
		{
			label: 'Zakat, Tax and Customs Services',
			href: '#'
		}
	],
	pageTitle = 'Request an Installment Plan',
	onPrint = () => window.print(),
	onFavorite = () => {},
	shareUrl = typeof window !== 'undefined' ? window.location.href : '',
	shareTitle = 'Request an Installment Plan'
}: BreadcrumbSocialProps) => {
	const [shareMenuOpen, setShareMenuOpen] = useState(false)
	const [audioMenuOpen, setAudioMenuOpen] = useState(false)

	const handleShareEmail = () => {
		window.location.href = `mailto:?subject=${encodeURIComponent(shareTitle)}&body=Check%20out%20this%20site%20${encodeURIComponent(shareUrl)}`
	}

	const handleShareLinkedIn = () => {
		window.open(
			`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`,
			'_blank'
		)
	}

	const handleShareTwitter = () => {
		window.open(
			`https://twitter.com/share?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`,
			'_blank'
		)
	}

	return (
		<div className="flex items-center flex-wrap gap-4 mb-6 w-full max-w-4xl">
			<nav className="flex-1 flex items-center text-sm" aria-label="Breadcrumb">
				<ol className="flex items-center flex-wrap gap-0 list-none p-0 m-0">
					{breadcrumbs.map((item, index) => (
						<li key={index} className="flex items-center">
							{index > 0 && <ChevronRight className="w-4 h-4 mx-1 text-gray-400" />}
							<a
								href={item.href || '#'}
								className="text-gray-700 hover:text-gray-900 transition-colors text-sm font-normal"
								onClick={(e) => e.preventDefault()}
							>
								{item.label}
							</a>
						</li>
					))}
					<li className="flex items-center">
						<ChevronRight className="w-4 h-4 mx-1 text-gray-400" />
						<span className="text-gray-400 text-sm font-normal">{pageTitle}</span>
					</li>
				</ol>
			</nav>
			<ul className="flex items-center gap-3 list-none p-0 m-0">
				<li className="relative">
					<button
						onClick={() => setShareMenuOpen(!shareMenuOpen)}
						onBlur={() => setTimeout(() => setShareMenuOpen(false), 200)}
						className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-all duration-300"
						title="Share"
						aria-label="Share"
					>
						<Share2 className="w-5 h-5 text-gray-700" />
					</button>
					{shareMenuOpen && (
						<div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded p-2 z-50">
							<ul className="flex gap-2 list-none p-0 m-0">
								<li>
									<button
										onClick={handleShareEmail}
										className="flex items-center justify-center w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
										title="Share by email"
										aria-label="Share by email"
									>
										<Mail className="w-4 h-4" />
									</button>
								</li>
								<li>
									<button
										onClick={handleShareLinkedIn}
										className="flex items-center justify-center w-8 h-8 bg-[#0a66c2] hover:bg-[#004182] text-white rounded transition-colors"
										title="Share on LinkedIn"
										aria-label="Share on LinkedIn"
									>
										<Linkedin className="w-4 h-4" />
									</button>
								</li>
								<li>
									<button
										onClick={handleShareTwitter}
										className="flex items-center justify-center w-8 h-8 bg-black hover:bg-gray-800 text-white rounded transition-colors"
										title="Share on Twitter"
										aria-label="Share on Twitter"
									>
										<Twitter className="w-4 h-4" />
									</button>
								</li>
							</ul>
							<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45" />
						</div>
					)}
				</li>
				<li>
					<button
						onClick={onPrint}
						className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-all duration-300"
						title="Print"
						aria-label="Print"
					>
						<Printer className="w-5 h-5 text-gray-700" />
					</button>
				</li>
				<li>
					<button
						onClick={onFavorite}
						className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-all duration-300"
						title="Add to favorites"
						aria-label="Add to favorites"
					>
						<Star className="w-5 h-5 text-gray-700" />
					</button>
				</li>
				<li className="relative">
					<button
						onClick={() => setAudioMenuOpen(!audioMenuOpen)}
						onBlur={() => setTimeout(() => setAudioMenuOpen(false), 200)}
						className="flex items-center justify-center w-10 h-10 rounded hover:bg-gray-100 transition-all duration-300"
						title="Audio"
						aria-label="Audio"
					>
						<Volume2 className="w-5 h-5 text-gray-700" />
					</button>
					{audioMenuOpen && (
						<div className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white shadow-lg border border-gray-200 rounded p-2 z-50">
							<button
								onClick={() => {}}
								className="flex items-center gap-2 px-3 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-300 rounded text-sm text-gray-700 transition-colors whitespace-nowrap"
							>
								<Volume2 className="w-4 h-4 text-green-600" />
								<span className="font-bold">Listen</span>
							</button>
							<div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-r border-b border-gray-200 rotate-45" />
						</div>
					)}
				</li>
			</ul>
		</div>
	)
}









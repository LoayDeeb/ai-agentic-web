import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Share2, Printer, Star, Volume2, Mail, Linkedin, Twitter } from 'lucide-react'

type ServiceActionsBarProps = {
	title?: string
	onPrint?: () => void
	onAddToFavorites?: () => void
}

const noop = () => {}

const stopNav: React.MouseEventHandler<HTMLAnchorElement | HTMLButtonElement> = (e) => {
	e.preventDefault()
	e.stopPropagation()
}

export const ServiceActionsBar = ({
	title,
	onPrint,
	onAddToFavorites
}: ServiceActionsBarProps) => {
	const { t } = useTranslation()
	const [showShareOptions, setShowShareOptions] = useState(false)
	const [showAudioOptions, setShowAudioOptions] = useState(false)
	const shareRef = useRef<HTMLLIElement>(null)
	const audioRef = useRef<HTMLLIElement>(null)
	
	const displayTitle = title || t('Zakat, Tax and Customs Services')

	useEffect(() => {
		const onDocClick = (e: MouseEvent) => {
			const t = e.target as Node
			if (showShareOptions && shareRef.current && !shareRef.current.contains(t)) {
				setShowShareOptions(false)
			}
			if (showAudioOptions && audioRef.current && !audioRef.current.contains(t)) {
				setShowAudioOptions(false)
			}
		}
		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setShowShareOptions(false)
				setShowAudioOptions(false)
			}
		}
		document.addEventListener('click', onDocClick)
		document.addEventListener('keydown', onKey)
		return () => {
			document.removeEventListener('click', onDocClick)
			document.removeEventListener('keydown', onKey)
		}
	}, [showShareOptions, showAudioOptions])

	const handlePrint = () => {
		if (onPrint) onPrint()
		else if (typeof window !== 'undefined') window.print()
	}

	const handleAddToFavorites = () => {
		if (onAddToFavorites) onAddToFavorites()
	}

	const toggleShare = () => {
		setShowShareOptions((s) => !s)
		setShowAudioOptions(false)
	}

	const toggleAudio = () => {
		setShowAudioOptions((s) => !s)
		setShowShareOptions(false)
	}

	return (
		<div className="flex items-center justify-between flex-wrap w-full gap-4 p-4">
			<h3
				className="font-bold text-[#1f2a37] text-3xl leading-9 m-0"
				style={{
					fontFamily: '"IBM Plex Sans Arabic", sans-serif'
				}}
			>
				{displayTitle}
			</h3>
			<div>
				<ul className="flex items-center gap-3 list-none p-0 m-0">
					<li className="relative" ref={shareRef}>
						<button
							onClick={toggleShare}
							className="flex items-center justify-center w-10 h-10 rounded transition-all duration-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
							title="Share"
							aria-label="Share"
							aria-haspopup="menu"
							aria-expanded={showShareOptions}
							aria-controls="share-menu"
						>
							<Share2 className="w-5 h-5 text-[#161616]" />
						</button>
						{showShareOptions && (
							<div
								id="share-menu"
								role="menu"
								className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white shadow-md border border-[#dee2e6] rounded p-2 z-[1000]"
							>
								<ul className="flex gap-2 list-none p-0 m-0">
									<li>
										<a
											href=""
											onClick={stopNav}
											className="flex items-center justify-center w-8 h-8 bg-[#1877f2] rounded transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#1877f2]/40"
											title="Share by email"
											aria-label="Share by email"
											role="menuitem"
										>
											<Mail className="w-4 h-4 text-white" />
										</a>
									</li>
									<li>
										<a
											href=""
											onClick={stopNav}
											className="flex items-center justify-center w-8 h-8 bg-[#0a66c2] rounded transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#0a66c2]/40"
											title="Share on LinkedIn"
											aria-label="Share on LinkedIn"
											role="menuitem"
										>
											<Linkedin className="w-4 h-4 text-white" />
										</a>
									</li>
									<li>
										<a
											href=""
											onClick={stopNav}
											className="flex items-center justify-center w-8 h-8 bg-black rounded transition-all duration-200 hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
											title="Share on X"
											aria-label="Share on X"
											role="menuitem"
										>
											<Twitter className="w-4 h-4 text-white" />
										</a>
									</li>
								</ul>
								<span className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#dee2e6] rotate-45"></span>
							</div>
						)}
					</li>
					<li>
						<a
							href=""
							onClick={(e) => {
								stopNav(e)
								handlePrint()
							}}
							className="flex items-center justify-center w-10 h-10 rounded transition-all duration-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
							title="Print"
							aria-label="Print"
						>
							<Printer className="w-5 h-5 text-[#161616]" />
						</a>
					</li>
					<li>
						<a
							href=""
							onClick={(e) => {
								stopNav(e)
								handleAddToFavorites()
							}}
							className="flex items-center justify-center w-10 h-10 rounded transition-all duration-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
							title="Add to favorites"
							aria-label="Add to favorites"
						>
							<Star className="w-5 h-5 text-[#161616]" />
						</a>
					</li>
					<li className="relative" ref={audioRef}>
						<button
							onClick={toggleAudio}
							className="flex items-center justify-center w-10 h-10 rounded transition-all duration-500 hover:bg-gray-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
							title="Audio"
							aria-label="Audio"
							aria-haspopup="menu"
							aria-expanded={showAudioOptions}
							aria-controls="audio-menu"
						>
							<Volume2 className="w-5 h-5 text-[#161616]" />
						</button>
						{showAudioOptions && (
							<div
								id="audio-menu"
								role="menu"
								className="absolute bottom-12 left-1/2 -translate-x-1/2 bg-white shadow-md border border-[#dee2e6] rounded p-2 z-[1000] min-w-[140px]"
							>
								<button
									onClick={noop}
									className="flex items-center gap-2 px-3 py-2 text-sm text-[#333] hover:bg-gray-50 rounded w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300"
									role="menuitem"
								>
									<Volume2 className="w-4 h-4 text-[#288544]" />
									<span className="font-semibold">Listen</span>
								</button>
								<span className="pointer-events-none absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white border-b border-r border-[#dee2e6] rotate-45"></span>
							</div>
						)}
					</li>
				</ul>
			</div>
		</div>
	)
}


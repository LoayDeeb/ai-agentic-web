import React from 'react'
import { Link } from 'react-router-dom'
import { useLocaleStore } from '../store/locale'
import { TopHeaderBar } from '../components/TopHeader'
import { ZATCAHeader } from '../components/ZATCAHeader'

export default function Home() {
	const switchLang = useLocaleStore((s) => s.switchLanguage)
	const dir = useLocaleStore((s) => s.dir)
	React.useEffect(() => {
		document.documentElement.dir = dir
	}, [dir])
	return (
		<div className="min-h-screen">
			<TopHeaderBar onLanguageSwitch={() => switchLang()} />
			<ZATCAHeader />
			<div className="p-8">
				<h1 className="text-2xl font-bold mb-4">ZATCA Voice-Agent Demo</h1>
				<p className="mb-6">
					This demo showcases a voice-enabled assistant that can navigate services and
					guide users through ZATCA flows.
				</p>
				<Link
					to="/services"
					className="inline-block bg-[#1B8354] text-white rounded px-4 py-2 hover:bg-[#156b45]"
				>
					Browse Services
				</Link>
			</div>
		</div>
	)
}

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
				<div className="flex flex-wrap gap-3">
					<Link
						to="/services"
						className="inline-block bg-[#1B8354] text-white rounded px-4 py-2 hover:bg-[#156b45]"
					>
						Browse Services
					</Link>
					<Link
						to="/zain"
						className="inline-block bg-[#1a0050] text-white rounded px-4 py-2 hover:bg-[#2a0a73]"
					>
						Open Zain Demo
					</Link>
					<Link
						to="/eshop"
						className="inline-block bg-[#d12b8a] text-white rounded px-4 py-2 hover:bg-[#b51f77]"
					>
						Open eShop Demo
					</Link>
					<Link
						to="/bahraincredit"
						className="inline-block rounded bg-[#193a85] px-4 py-2 text-white hover:bg-[#142f6b]"
					>
						Open BahrainCredit Demo
					</Link>
					<Link
						to="/muscat-university"
						className="inline-block rounded bg-[#0B2D42] px-4 py-2 text-white hover:bg-[#123d58]"
					>
						Open Muscat University Demo
					</Link>
				</div>
			</div>
		</div>
	)
}

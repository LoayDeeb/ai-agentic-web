import React from 'react'
import { Globe, Phone, HelpCircle } from 'lucide-react'

export const MoinHeader = () => {
	return (
		<header className="w-full" dir="rtl">
			{/* Top utility bar */}
			<div className="bg-[#132144] text-white">
				<div className="container mx-auto px-4 py-2 flex items-center justify-between">
					<div className="flex items-center gap-6 text-xs">
						<a
							href="#"
							className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
						>
							<Phone size={12} />
							<span>اتصل بنا</span>
						</a>
						<a
							href="#"
							className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors"
						>
							<HelpCircle size={12} />
							<span>الدعم</span>
						</a>
					</div>
					<a
						href="#"
						className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors text-xs"
					>
						<Globe size={12} />
						<span>English</span>
					</a>
				</div>
			</div>

			{/* Main nav bar */}
			<div className="bg-white border-b border-[#e7eaf3b3]">
				<div className="container mx-auto px-4 py-4 flex items-center justify-between">
					<div className="flex items-center gap-3">
						<div className="w-10 h-10 bg-[#132144] rounded-lg flex items-center justify-center">
							<span className="text-[#e7b47e] font-bold text-lg">
								م
							</span>
						</div>
						<div>
							<h1
								className="text-[#132144] font-bold text-base leading-tight"
								style={{
									fontFamily: 'Vazirmatn, Arial, sans-serif',
								}}
							>
								بوابة المستثمر
							</h1>
							<p className="text-[#677788] text-[10px]">
								وزارة الاستثمار - المملكة الأردنية الهاشمية
							</p>
						</div>
					</div>

					<nav className="hidden md:flex items-center gap-8">
						{['الرئيسية', 'الخدمات', 'عن الوزارة', 'التشريعات'].map(
							(item) => (
								<a
									key={item}
									href="#"
									className="text-[#132144] text-sm font-medium hover:text-[#377dff] transition-colors"
									style={{
										fontFamily:
											'Vazirmatn, Arial, sans-serif',
									}}
								>
									{item}
								</a>
							)
						)}
					</nav>
				</div>
			</div>
		</header>
	)
}

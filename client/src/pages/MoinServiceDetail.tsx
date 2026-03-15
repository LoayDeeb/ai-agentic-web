import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'lucide-react'
import { MoinHeader } from '../components/moin/MoinHeader'
import { InvestorCardForm } from '../components/moin/InvestorCardForm'

export default function MoinServiceDetail() {
	const navigate = useNavigate()

	return (
		<div
			className="min-h-screen w-full bg-[#f8f9fa]"
			dir="rtl"
			style={{ fontFamily: 'Vazirmatn, Arial, sans-serif' }}
		>
			<MoinHeader />

			<div className="container mx-auto px-4 py-8">
				{/* Breadcrumb */}
				<nav className="flex items-center gap-2 text-sm text-[#677788] mb-8">
					<button
						onClick={() => navigate('/moin')}
						className="hover:text-[#132144] transition-colors flex items-center gap-1"
					>
						<ChevronLeft size={14} className="rotate-180" />
						<span>الخدمات</span>
					</button>
					<span>/</span>
					<span className="text-[#132144] font-medium">
						طلب اصدار بطاقة المستثمر
					</span>
				</nav>

				<InvestorCardForm />
			</div>
		</div>
	)
}

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MoinHeader } from '../components/moin/MoinHeader'
import { MoinServiceCard } from '../components/moin/MoinServiceCard'

const investorServices = [
	{
		title: 'طلب اصدار بطاقة المستثمر للفئة (أ)',
		progress: 100,
		imageSrc: 'https://portal.moin.gov.jo/assets/images/window.png',
	},
	{
		title: 'طلب اصدار بطاقة المستثمر للفئة (ب)',
		progress: 100,
		imageSrc: 'https://portal.moin.gov.jo/assets/images/window.png',
	},
	{
		title: 'طلب اصدار بطاقة المستثمر للفئة (ج)',
		progress: 100,
		imageSrc: 'https://portal.moin.gov.jo/assets/images/window.png',
	},
	{
		title: 'طلب تجديد بطاقة المستثمر للفئة (أ)',
		progress: 60,
		imageSrc: 'https://portal.moin.gov.jo/assets/images/window.png',
	},
	{
		title: 'اصدار بطاقة افراد عائلة المستثمر أ_ب_ج',
		progress: 30,
		imageSrc: 'https://portal.moin.gov.jo/assets/images/window.png',
	},
	{
		title: 'طلب الحصول على حوافز استثمارية',
		progress: 100,
		imageSrc: 'https://portal.moin.gov.jo/assets/images/window.png',
	},
]

export default function MoinServices() {
	const navigate = useNavigate()

	const handleServiceClick = () => {
		navigate('/moin/service')
	}

	return (
		<div
			className="min-h-screen w-full bg-[#f8f9fa]"
			dir="rtl"
			style={{ fontFamily: 'Vazirmatn, Arial, sans-serif' }}
		>
			<MoinHeader />

			<div className="container mx-auto px-4 py-12">
				<div className="mb-12 text-center">
					<h2 className="text-3xl font-bold text-[#1c1c1c] mb-2">
						خدمات المستثمر
					</h2>
					<p className="text-[#677788]">
						اختر الخدمة المطلوبة للمتابعة
					</p>
				</div>

				<div
					className="flex flex-wrap justify-center gap-8"
					id="moin-services-grid"
				>
					{investorServices.map((service, index) => (
						<MoinServiceCard
							key={index}
							title={service.title}
							progress={service.progress}
							imageSrc={service.imageSrc}
							onClick={handleServiceClick}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

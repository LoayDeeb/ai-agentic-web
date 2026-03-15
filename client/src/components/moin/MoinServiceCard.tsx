import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface MoinServiceCardProps {
	title?: string
	imageSrc?: string
	progress?: number
	badge?: string
	buttonText?: string
	onClick?: () => void
	className?: string
}

export const MoinServiceCard = ({
	title = 'طلب اصدار بطاقة المستثمر للفئة (ب)',
	imageSrc = 'https://portal.moin.gov.jo/assets/images/window.png',
	progress = 100,
	badge,
	buttonText = 'تقديم طلب',
	onClick = () => {},
	className,
}: MoinServiceCardProps) => {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.div
			className={cn(
				'relative flex flex-col min-w-0 w-[370px] max-w-full bg-white border border-[#e7eaf3b3] rounded-xl overflow-hidden transition-all duration-300',
				isHovered
					? 'shadow-[0_6px_12px_rgba(140,152,164,0.15)]'
					: 'shadow-[0_6px_12px_rgba(140,152,164,0.075)]',
				className
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4 }}
		>
			<div className="overflow-hidden rounded-t-xl h-1 bg-[#bdc5d1]">
				<motion.div
					className="h-full bg-[#e7b47e]"
					initial={{ width: 0 }}
					animate={{ width: `${progress}%` }}
					transition={{ duration: 0.8, ease: 'easeOut' }}
					role="progressbar"
					aria-valuenow={progress}
					aria-valuemin={0}
					aria-valuemax={100}
				/>
			</div>

			<div className="flex-1 flex flex-col p-6 text-center">
				<div className="flex items-center justify-start text-left mb-6 h-4">
					{badge && (
						<span className="text-[10.6px] font-bold text-[#ed4c78] bg-[#ed4c781a] px-2 py-2 rounded-[5px]">
							{badge}
						</span>
					)}
				</div>

				<div className="flex justify-center mb-2">
					<div className="relative w-[54px] h-[54px]">
						<img
							alt="Service Icon"
							src={imageSrc}
							className="w-full h-full object-cover rounded-lg"
							onError={(e) => {
								const target = e.target as HTMLImageElement
								target.src =
									'https://portal.moin.gov.jo/assets/images/window.png'
							}}
						/>
					</div>
				</div>

				<div className="mb-2 text-[#e7b47e]">
					<h4
						className="text-[15.8px] font-semibold leading-[18.8px] text-[#1c1c1c] m-0 mb-1"
						dir="rtl"
					>
						{title}
					</h4>
				</div>
			</div>

			<div className="p-5 border-t border-[#e7eaf3b3] rounded-b-xl flex justify-center">
				<button
					onClick={onClick}
					className={cn(
						'inline-block px-4 py-[9.8px] text-sm font-normal text-[#132144] bg-transparent border border-[#132144] rounded-[5px] cursor-pointer transition-all duration-150 ease-in-out hover:bg-[#132144] hover:text-white',
						'active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#132144]/20'
					)}
					style={{ fontFamily: 'Vazirmatn, Arial, sans-serif' }}
				>
					{buttonText}
				</button>
			</div>
		</motion.div>
	)
}

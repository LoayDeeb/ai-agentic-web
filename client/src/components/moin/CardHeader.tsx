import React from 'react'
import { cn } from '../../lib/utils'

interface CardHeaderProps {
	title?: string
	className?: string
	subtitle?: string
	dir?: 'rtl' | 'ltr'
}

export const CardHeader = ({
	title = 'طلب اصدار بطاقة المستثمر للفئة (أ)',
	className,
	subtitle,
	dir = 'rtl',
}: CardHeaderProps) => {
	return (
		<div
			dir={dir}
			className={cn(
				'w-full bg-white border-b border-[rgba(231,234,243,0.7)] rounded-t-[11px] px-[21px] py-[16px]',
				className
			)}
		>
			<h3
				className={cn(
					'm-0 mb-2 font-semibold text-[18.4px] leading-[22px] text-[#1c1c1c]',
					dir === 'rtl' ? 'text-right' : 'text-left'
				)}
			>
				{title}
			</h3>
			{subtitle && (
				<p
					className={cn(
						'm-0 text-[14px] text-[#677788] overflow-wrap-anywhere',
						dir === 'rtl' ? 'text-right' : 'text-left'
					)}
				>
					{subtitle}
				</p>
			)}
		</div>
	)
}

import React from 'react'

type InfoCardItemProps = {
	icon?: string | React.ReactNode
	title: string
	description: string
	width?: string
}

export const InfoCardItem = ({
	icon,
	title,
	description,
	width = '354.2px'
}: InfoCardItemProps) => {
	return (
		<div className="pb-4" style={{ width }}>
			<div className="flex gap-2 mb-1 font-normal leading-6">
				{icon && (
					<div className="flex-shrink-0 w-6 h-6 text-gray-600">
						{typeof icon === 'string' ? (
							<img
								src={icon}
								alt={title.toLowerCase().replace(/\s+/g, '-')}
								className="w-6 h-6"
								onError={(e) => {
									e.currentTarget.style.display = 'none'
								}}
							/>
						) : (
							icon
						)}
					</div>
				)}
				<div>
					<h3
						className="font-semibold text-[#1F2A37] text-base box-border leading-6 m-0"
						style={{
							fontFamily: '"IBM Plex Sans Arabic", sans-serif'
						}}
					>
						{title}
					</h3>
					<div className="text-base leading-6 text-[#1F2A37]">{description}</div>
				</div>
			</div>
		</div>
	)
}


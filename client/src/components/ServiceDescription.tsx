import React from 'react'

type ServiceDescriptionProps = {
	description?: string
	maxWidth?: number
	paddingY?: number
	paddingBottom?: number
}

export const ServiceDescription = ({
	description = 'An e-service that allows you to request installment payments in cases where you face difficulties in paying the full amount due.',
	maxWidth = 852.4,
	paddingY = 32,
	paddingBottom = 64
}: ServiceDescriptionProps) => {
	return (
		<div
			className="text-[#161616] text-base font-normal leading-6"
			style={{
				padding: `${paddingY}px 0px ${paddingBottom}px 0px`,
				width: `${maxWidth}px`
			}}
		>
			{description}
			<br />
		</div>
	)
}









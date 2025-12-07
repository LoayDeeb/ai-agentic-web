import React from 'react'
import { useTranslation } from 'react-i18next'

type ServicesCountProps = {
	count: number
	label?: string
}

export const ServicesCount = ({ count, label }: ServicesCountProps) => {
	const { t } = useTranslation()
	const displayLabel = label || t('electronic services')
	
	return (
		<p className="text-[#6c737f] pb-6 m-0 w-full">
			{t('Found')} {count} {displayLabel}
		</p>
	)
}


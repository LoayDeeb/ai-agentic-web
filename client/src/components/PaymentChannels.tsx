import React from 'react'
import { useTranslation } from 'react-i18next'

type PaymentChannelsProps = {
	showFree?: boolean
	enabledChannels?: {
		sadad?: boolean
		mada?: boolean
		visa?: boolean
	}
}

export const PaymentChannels = ({
	showFree = false,
	enabledChannels = {
		sadad: true,
		mada: true,
		visa: true
	}
}: PaymentChannelsProps) => {
	const { t } = useTranslation()
	
	return (
		<div className="pb-0" style={{ width: '354.2px' }}>
			<div className="flex gap-1 mb-1 font-normal leading-6">
				<h3
					className="font-semibold m-0 text-[#1f2a37] text-base leading-6"
					style={{
						fontFamily: '"IBM Plex Sans Arabic", sans-serif'
					}}
				>
					{t('Payment Channels')}
				</h3>
			</div>

			<div className="mt-2.5">
				<div className="flex flex-wrap gap-2.5">
					{showFree && <span className="inline-block">Free</span>}

					{enabledChannels.sadad && (
						<img
							src="https://zatca.gov.sa/_layouts/15/zatca/Design/images/icons/card-details-icon/sadad.svg"
							alt="sadad"
							className="block align-middle max-w-full"
							style={{
								height: '32px',
								width: '45.8px'
							}}
						/>
					)}

					{enabledChannels.mada && (
						<img
							src="https://zatca.gov.sa/_layouts/15/zatca/Design/images/icons/card-details-icon/mada.svg"
							alt="mada"
							className="block align-middle max-w-full"
							style={{
								height: '32px',
								width: '46.6px'
							}}
						/>
					)}

					{enabledChannels.visa && (
						<img
							src="https://zatca.gov.sa/_layouts/15/zatca/Design/images/icons/card-details-icon/visa.svg"
							alt="visa"
							className="block align-middle max-w-full"
							style={{
								height: '32px',
								width: '46.6px'
							}}
						/>
					)}
				</div>
			</div>
		</div>
	)
}


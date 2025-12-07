import React from 'react'
import { useTranslation } from 'react-i18next'
import { Monitor } from 'lucide-react'

type Channel = {
	id: string
	label: string
	active: boolean
}

type ServiceChannelsCardProps = {
	channels?: Channel[]
	iconUrl?: string
	title?: string
}

const defaultChannels: Channel[] = [
	{ id: 'callcenter', label: 'Call Center', active: false },
	{ id: 'branch', label: 'Branch', active: false },
	{ id: 'website', label: 'Website', active: true },
	{ id: 'mobileapp', label: 'Mobile App', active: false },
	{ id: 'manager', label: 'Relationship Managers', active: false },
	{ id: 'livechat', label: 'Live Chat', active: false },
	{ id: 'twitter', label: 'Twitter', active: false },
	{ id: 'email', label: 'Email', active: false }
]

export const ServiceChannelsCard = (props: ServiceChannelsCardProps) => {
	const { t } = useTranslation()
	const {
		channels = defaultChannels,
		title
	} = props
	const displayTitle = title || t('Service Channels')

	return (
		<div className="pb-4" style={{ width: '354.2px' }}>
			<div className="flex gap-2 mb-1 font-normal leading-6">
				<div className="flex-shrink-0 w-6 h-6 text-gray-600">
					<Monitor className="w-6 h-6" />
				</div>
				<div>
					<h3
						className="font-semibold text-[#1f2a37] text-base leading-6 m-0"
						style={{
						fontFamily: '"IBM Plex Sans Arabic", sans-serif'
					}}
				>
					{displayTitle}
				</h3>
					<div>
						<div className="flex">
							<div className="flex-1">
								<ul className="flex flex-wrap gap-[5.2px] p-0 m-0 list-none">
									{channels.map((channel) => (
										<li key={channel.id} className={channel.active ? 'list-item' : 'hidden'}>
											<span className="text-sm text-[#1f2a37]">{channel.label}</span>
										</li>
									))}
								</ul>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}


import React from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, ExternalLink } from 'lucide-react'

type ContactItemProps = {
	icon?: React.ReactNode
	title: string
	content: string | React.ReactNode
	href?: string
	showLinkIcon?: boolean
}

const ContactItem = ({ icon, title, content, href, showLinkIcon = true }: ContactItemProps) => {
	const ContentWrapper = href ? 'a' : 'div'
	const contentProps = href
		? {
				href,
				className:
					'flex items-center gap-1 text-[rgb(27,131,84)] transition-colors duration-200 ease-in-out hover:text-[rgb(20,100,64)]'
			}
		: {}

	return (
		<div className="pb-4">
			<div className="flex gap-1 mb-1 font-normal leading-6">
				{icon && <div className="w-6 h-6 flex-shrink-0">{icon}</div>}
				<div>
					<h3 className="font-semibold font-['IBM_Plex_Sans_Arabic',sans-serif] text-[rgb(31,42,55)] text-base leading-6 m-0">
						{title}
					</h3>
					<ContentWrapper {...contentProps}>
						<span>{content}</span>
						{href && showLinkIcon && <ExternalLink className="w-6 h-6" />}
					</ContentWrapper>
				</div>
			</div>
		</div>
	)
}

type SupportContactInfoProps = {
	faqLink?: string
	phoneNumber?: string
	email?: string
	twitterHandle?: string
	twitterUrl?: string
	manualLink?: string
	manualLabel?: string
	className?: string
}

export const SupportContactInfo = ({
	faqLink = '',
	phoneNumber = '19993',
	email = 'info@zatca.gov.sa',
	twitterHandle = '@Zatca_care',
	twitterUrl = '',
	manualLink = '',
	manualLabel,
	className = ''
}: SupportContactInfoProps) => {
	const { t } = useTranslation()
	const displayManualLabel = manualLabel || t('Service User Manual')
	
	return (
		<div
			className={`border-t-[0.6px] border-[rgb(210,214,219)] pt-6 pb-6 w-full max-w-[354px] ${className}`}
		>
			<ContactItem title={t('Frequently Asked Questions (FAQs)')} content="FAQs" href={faqLink} />

			<ContactItem
				icon={<Phone className="w-6 h-6" />}
				title={t('Phone')}
				content={phoneNumber}
				href={`tel:${phoneNumber}`}
			/>

			<ContactItem
				icon={<Mail className="w-6 h-6" />}
				title={t('Email')}
				content={email}
				href={`mailto:${email}`}
			/>

			<ContactItem
				icon={
					<svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
						<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
					</svg>
				}
				title={t('Contact via X')}
				content={twitterHandle}
				href={twitterUrl}
			/>

			{manualLink && (
				<div className="mt-4">
					<a
						href={manualLink}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-block text-[rgb(22,22,22)] font-['IBM_Plex_Sans_Arabic',sans-serif] text-base font-medium leading-6 text-center cursor-pointer bg-[rgb(243,244,246)] transition-all duration-150 ease-in-out min-h-[40px] border-[0.6px] border-[rgb(243,244,246)] rounded px-4 py-1.5 hover:bg-[rgb(229,231,235)]"
					>
						{displayManualLabel}
					</a>
				</div>
			)}
		</div>
	)
}


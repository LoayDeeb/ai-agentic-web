import React, { useState } from 'react'
import { motion } from 'framer-motion'

type Tab = {
	id: string
	label: string
}

type TabNavigationProps = {
	tabs?: Tab[]
	defaultActiveTab?: string
	onTabChange?: (tabId: string) => void
}

const defaultTabs: Tab[] = [
	{
		id: 'steps',
		label: 'Steps'
	},
	{
		id: 'requirements',
		label: 'Eligibility'
	},
	{
		id: 'info',
		label: 'Required Documents'
	}
]

export const TabNavigation = ({
	tabs = defaultTabs,
	defaultActiveTab,
	onTabChange
}: TabNavigationProps) => {
	const [activeTab, setActiveTab] = useState<string>(defaultActiveTab || tabs[0]?.id || '')

	const handleTabClick = (tabId: string) => {
		setActiveTab(tabId)
		onTabChange?.(tabId)
	}

	return (
		<ul role="tablist" className="flex flex-wrap list-none p-0 m-0 mb-6 w-full max-w-[852px]">
			{tabs.map((tab) => {
				const isActive = activeTab === tab.id
				return (
					<li key={tab.id} role="presentation" className="px-4">
						<div
							role="tab"
							aria-selected={isActive}
							tabIndex={isActive ? 0 : -1}
							onClick={() => handleTabClick(tab.id)}
							className="relative cursor-pointer mb-[-1px] rounded-t-lg px-0 py-3 transition-all duration-150 ease-in-out"
						>
							<span
								className={`block text-sm leading-5 ${
									isActive
										? 'font-bold text-[rgb(22,22,22)]'
										: 'font-medium text-[rgb(56,66,80)]'
								}`}
							>
								{tab.label}
							</span>
							{isActive && (
								<motion.span
									layoutId="activeTabIndicator"
									className="absolute bottom-0 left-0 right-0 h-0.5 bg-[rgb(27,131,84)] rounded-full"
									initial={false}
									transition={{
										type: 'spring',
										stiffness: 500,
										damping: 30
									}}
								/>
							)}
						</div>
					</li>
				)
			})}
		</ul>
	)
}









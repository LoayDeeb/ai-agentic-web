import React from 'react'
import { Check } from 'lucide-react'

type Step = {
	number: number
	label: string
	completed: boolean
	active: boolean
}

type StepIndicatorProps = {
	steps: Step[]
}

export const StepIndicator = ({ steps }: StepIndicatorProps) => {
	return (
		<div className="w-full mb-8">
			<div className="flex items-center justify-between">
				{steps.map((step, index) => (
					<React.Fragment key={step.number}>
						{/* Step circle */}
						<div className="flex flex-col items-center relative">
							<div
								className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
									step.completed
										? 'bg-[#1B8354] text-white'
										: step.active
											? 'bg-[#1B8354] text-white ring-4 ring-[#1B8354]/20'
											: 'bg-gray-200 text-gray-500'
								}`}
							>
								{step.completed ? <Check className="w-5 h-5" /> : step.number}
							</div>
							<span
								className={`mt-2 text-xs font-medium text-center max-w-[100px] ${
									step.active ? 'text-[#1B8354]' : 'text-gray-600'
								}`}
								style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
							>
								{step.label}
							</span>
						</div>

						{/* Connector line */}
						{index < steps.length - 1 && (
							<div
								className={`flex-1 h-1 mx-2 transition-all ${
									step.completed ? 'bg-[#1B8354]' : 'bg-gray-200'
								}`}
								style={{ marginTop: '-30px' }}
							/>
						)}
					</React.Fragment>
				))}
			</div>
		</div>
	)
}









import React from 'react'

type InstallmentHeaderProps = {
	title?: string
	buttonText?: string
	buttonHref?: string
	onButtonClick?: () => void
}

export const InstallmentHeader = ({
	title = 'Request an Installment Plan',
	buttonText = 'Start now',
	buttonHref = '#',
	onButtonClick
}: InstallmentHeaderProps) => {
	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		e.preventDefault()
		if (onButtonClick) {
			onButtonClick()
		}
	}

	return (
		<div className="flex justify-between items-center flex-wrap mb-4 gap-4 w-full max-w-[852.4px]">
			<h1
				className="font-bold text-[30px] leading-[38px] text-[rgb(22,22,22)] m-0"
				style={{
					fontFamily: '"IBM Plex Sans Arabic", sans-serif'
				}}
			>
				{title}
			</h1>

			<a
				href={buttonHref}
				onClick={handleClick}
				className="block text-center text-white font-medium text-base leading-6 cursor-pointer bg-[rgb(27,131,84)] transition-all duration-150 ease-in-out min-h-[40px] min-w-[128px] border border-[rgb(27,131,84)] rounded px-4 py-1.5 hover:bg-[rgb(24,117,75)] active:bg-[rgb(21,104,67)]"
				style={{
					fontFamily: '"IBM Plex Sans Arabic", sans-serif'
				}}
			>
				{buttonText}
			</a>
		</div>
	)
}









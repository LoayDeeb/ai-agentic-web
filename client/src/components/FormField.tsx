import React from 'react'

type FormFieldProps = {
	label: string
	required?: boolean
	error?: string
	children: React.ReactNode
	helpText?: string
}

export const FormField = ({ label, required, error, children, helpText }: FormFieldProps) => {
	return (
		<div className="mb-6">
			<label
				className="block mb-2 text-sm font-semibold text-[#1F2A37]"
				style={{ fontFamily: '"IBM Plex Sans Arabic", sans-serif' }}
			>
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			{children}
			{helpText && <p className="mt-1 text-xs text-gray-500">{helpText}</p>}
			{error && <p className="mt-1 text-xs text-red-600">{error}</p>}
		</div>
	)
}

type TextInputProps = {
	name?: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
	type?: 'text' | 'email' | 'number' | 'tel'
	disabled?: boolean
}

export const TextInput = ({
	name,
	value,
	onChange,
	placeholder,
	type = 'text',
	disabled
}: TextInputProps) => {
	return (
		<input
			name={name}
			type={type}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			disabled={disabled}
			className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B8354] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
		/>
	)
}

type SelectInputProps = {
	name?: string
	value: string
	onChange: (value: string) => void
	options: Array<{ value: string; label: string }>
	placeholder?: string
	disabled?: boolean
}

export const SelectInput = ({
	name,
	value,
	onChange,
	options,
	placeholder,
	disabled
}: SelectInputProps) => {
	return (
		<select
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			disabled={disabled}
			className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B8354] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed appearance-none bg-white"
			style={{
				backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
				backgroundPosition: 'right 0.75rem center',
				backgroundRepeat: 'no-repeat',
				backgroundSize: '1.5em 1.5em',
				paddingRight: '2.5rem'
			}}
		>
			{placeholder && (
				<option value="" disabled>
					{placeholder}
				</option>
			)}
			{options.map((opt) => (
				<option key={opt.value} value={opt.value}>
					{opt.label}
				</option>
			))}
		</select>
	)
}

type TextAreaProps = {
	name?: string
	value: string
	onChange: (value: string) => void
	placeholder?: string
	rows?: number
	disabled?: boolean
}

export const TextArea = ({
	name,
	value,
	onChange,
	placeholder,
	rows = 4,
	disabled
}: TextAreaProps) => {
	return (
		<textarea
			name={name}
			value={value}
			onChange={(e) => onChange(e.target.value)}
			placeholder={placeholder}
			rows={rows}
			disabled={disabled}
			className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1B8354] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed resize-vertical"
		/>
	)
}


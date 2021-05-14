import React from 'react'

export const Input = ({
	className,
	type,
	name,
	placeholder,
	onChange,
	err = false,
	value = '',
	labelClassName = '',
}: IInputProps) => {
	return (
		<>
			<label className={`font-mono ${labelClassName}`}>
				<input
					className={`${err ? 'border-red-700' : 'border-black'} ${className}`}
					name={name}
					type={type}
					placeholder={placeholder}
					onChange={(e) => onChange(e)}
				/>
				{value}
			</label>
		</>
	)
}

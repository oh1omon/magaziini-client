import React from 'react'

/**
 *
 * @param {IInputProps} propsObj all possible props
 * This input can take all possible(in this project, ofc) props and render right accessible inputs
 */
export const Input = ({
	className,
	type,
	name,
	placeholder,
	onChange,
	id = '',
	err = false,
	value,
	labelClassName = '',
	label,
}: IInputProps) => {
	return (
		<>
			<label className={`font-mono ${labelClassName}`}>
				<input
					className={`${err ? 'border-red-700' : 'border-black'} ${className}`}
					name={name}
					type={type}
					id={name}
					placeholder={placeholder}
					onChange={(e) => onChange(e)}
					value={value}
				/>
				{value}
			</label>
		</>
	)
}

import React from 'react'

export const Input = ({ className, type, name, placeholder, onChange }: IInputProps) => {
	return (
		<>
			<label className='font-mono'>
				<input
					className={className}
					name={name}
					type={type}
					placeholder={placeholder}
					onChange={(e) => onChange(e)}
				/>
			</label>
		</>
	)
}

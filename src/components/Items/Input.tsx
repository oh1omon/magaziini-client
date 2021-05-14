import React from 'react'

export const Input = ({ className, type, name, placeholder, onChange, err = false }: IInputProps) => {
	return (
		<>
			<label className='font-mono'>
				<input
					className={`${err ? 'border-red-700' : 'border-black'} ${className}`}
					name={name}
					type={type}
					placeholder={placeholder}
					onChange={(e) => onChange(e)}
				/>
			</label>
		</>
	)
}

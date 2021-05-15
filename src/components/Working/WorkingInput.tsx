import React from 'react'

export const WorkingInput = ({ name, type, className, err, changeHandler, label }: ITextareaProps) => {
	return (
		<div className={'flex flex-col'}>
			<label htmlFor={name}>{label}</label>
			<input
				type={type}
				id={name}
				name={name}
				className={`${className} ${err ? 'border-red-700' : 'border-black'}`}
				onChange={(e) => changeHandler(e)}
			/>
		</div>
	)
}

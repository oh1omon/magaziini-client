import React from 'react'

export const Textarea = ({ name, className, err, changeHandler, label, defaultValue }: ITextareaProps) => {
	return (
		<div className='mb-4 lg:mb-0 flex flex-col'>
			<label htmlFor={name}>{label}</label>
			<textarea
				onChange={(e) => changeHandler(e)}
				id={name}
				name={name}
				className={`${className} ${err ? 'border-red-700' : 'border-black'}`}
				defaultValue={defaultValue || ''}
			></textarea>
		</div>
	)
}

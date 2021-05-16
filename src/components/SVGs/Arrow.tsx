import React from 'react'

export const Arrow = ({ clickHandler }: IProfileProps) => {
	return (
		<svg
			className='transform -translate-x-1/2 w-6 h-6 text-black cursor-pointer absolute left-1/2 right-1/2 bottom-4'
			onClick={() => clickHandler()}
			width='16'
			height='19'
			viewBox='0 0 16 19'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path d='M8 1L8 19M1 8L8 1L1 8ZM8 1L15 8L8 1Z' stroke='black' />
		</svg>
	)
}

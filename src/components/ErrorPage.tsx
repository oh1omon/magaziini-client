import React from 'react'

export const ErrorPage = () => {
	return (
		<div className='z-10 flex items-center justify-center  overflow-y-scroll lg:overscroll-none text-xs bg-white w-full h-hero'>
			<div className='flex flex-col justify-center items-center w-4/5 font-mono lg:font-sans text-xs text-justify h-128 lg:h-140 text-opacity-80 my-12'>
				<div className={'w-auto h-1/2 flex flex-col justify-between items-center'}>
					<h1 className='font-sans text-xl lg:text-3xl'>404</h1>
					<h1 className='font-sans text-xl lg:text-3xl'>Just to be clear, I don't know where we are neither...</h1>
				</div>
			</div>
		</div>
	)
}

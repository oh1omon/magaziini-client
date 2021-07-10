import React from 'react'
import { Back } from './SVGs/Back'
import { IBackBtnProps } from '../react-app-env'

export const BackBtn = ({ backHandler }: IBackBtnProps) => {
	return (
		<div className={'md:absolute fixed bottom-6 right-6 md:top-12 md:left-12 z-10 max-w-min text-lg'}>
			<button
				onClick={backHandler}
				className={'py-2 px-4 border-2 border-black bg-white hover:bg-gray-200 flex flex-row items-center'}
			>
				<Back /> Back
			</button>
		</div>
	)
}

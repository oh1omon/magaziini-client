import React, { useState } from 'react'
import { addSub } from '../services/dispatchers'
import { Input } from './Input'
import { RenderSwitch } from './RenderSwitch'

export const Subscribe = () => {
	//Setting local state for email string
	const [subEmail, setSubEmail] = useState('')

	//Creating local state for information type
	const [info, setInfo] = useState({ type: '' })

	/**
	 * Function to keep updated email state according to user inputs
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubEmail(`${e.target.value}`)
	}

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 *
	 * If email string has passed validation, then we are submitting it to the dispatcher.
	 * Then we printing icon that suits the response we get from server
	 */
	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		addSub(subEmail).then((r) => setInfo({ type: r.type }))
	}

	return (
		<form className='flex flex-row group'>
			<Input
				labelClassName={'w-4/5'}
				placeholder='E-mail'
				type='email'
				name='email'
				onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueHandler(e)}
				className='w-full h-12 px-4 font-mono text-sm border-2 border-gray-500 lg:w-full focus:border-black focus:outline-none'
			/>
			<button
				onClick={(e) => submitHandler(e)}
				className='h-12 px-4 text-white bg-black border-2 border-gray-500 lg:-ml-12'
			>
				<RenderSwitch param={info.type} />
			</button>
		</form>
	)
}

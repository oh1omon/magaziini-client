import React, { useState } from 'react'
import { RenderSwitch } from '../RenderSwitch'
import { addSub } from '../services/dispatchers'
import { Input } from './Input'

export const Subscribe = () => {
	const [subEmail, setSubEmail] = useState('')

	const [infoMessage, setInfoMessage] = useState({ type: '' })

	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSubEmail(`${e.target.value}`)
	}

	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		addSub(subEmail).then((r) => setInfoMessage({ type: r.type }))
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
				<RenderSwitch param={infoMessage.type} />
			</button>
		</form>
	)
}

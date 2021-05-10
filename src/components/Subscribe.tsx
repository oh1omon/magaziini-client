import React, { useState } from 'react'
import { addSub } from '../services/dispatchers'
import { Error } from './SVGs/Error'
import { Okay } from './SVGs/Okay'
import { Send } from './SVGs/Send'

export const Subscribe = () => {
	const renderSwitch = (param: string) => {
		switch (param) {
			case 'error':
				return <Error />
			case 'info':
				return <Okay />
			default:
				return <Send />
		}
	}

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
			<input
				placeholder='E-mail'
				type='email'
				name='email'
				onChange={(e) => valueHandler(e)}
				className='w-full h-12 px-4 font-mono text-sm border-2 border-gray-500 lg:w-4/5 focus:border-black focus:outline-none'
			/>
			<button
				onClick={(e) => submitHandler(e)}
				className='h-12 px-4 text-white bg-black border-2 border-gray-500 lg:-ml-12'
			>
				{renderSwitch(infoMessage.type)}
			</button>
		</form>
	)
}

import React, { useState } from 'react'
import errorMessages from '../assets/texts/errors'
import { updateUser } from '../services/dispatchers'
import Validator from '../services/validator'
import { Input } from './Input'

export const PasswordChange = ({ passInputShown, passwordShowHandler }: IPasswordChangeProps) => {
	const [passwordObj, setPasswordObj] = useState({ password: '' })
	const [err, setErr] = useState<string[]>([])
	const [infoMessage, setInfoMessage] = useState({ message: '', type: '' })

	//Error messages
	const [errorsMsg] = useState(errorMessages)

	const passwordSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setErr([])
		setInfoMessage({ message: '', type: '' })
		const validationResult = Validator.password(passwordObj.password, [])
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}
		updateUser(passwordObj).then((r) => {
			setInfoMessage({ message: r.message, type: 'info' })
		})
	}
	const passwordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value })
	}

	return (
		<div className='flex flex-col items-center justify-center h-2/5'>
			<button
				onClick={(e) => passwordShowHandler(e)}
				className={` ${
					passInputShown ? 'hidden' : 'flex'
				} items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-gray-200`}
			>
				Change Password
			</button>
			<form className={`${passInputShown ? 'flex' : 'hidden'} flex-col h-3/4`}>
				<Input
					className='w-full h-12 px-4 mb-4 font-mono text-sm border-2 border-black focus:border-gray-500 focus:outline-none'
					name='password'
					type='password'
					placeholder='New Password'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => passwordValueHandler(e)}
				/>
				<div className={`${!passInputShown ? 'hidden' : 'flex'} text-mono justify-center items-center`}>
					<p className={`${infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'} `}>
						{infoMessage.message}
					</p>
					<p className={`${infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'} `}>
						{err.length > 0 && errorsMsg.filter((e) => e.type === err[0])[0].message}
					</p>
				</div>
				<button
					onClick={(e) => passwordSubmitHandler(e)}
					className={`flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-gray-200`}
				>
					Change Password
				</button>
			</form>
		</div>
	)
}

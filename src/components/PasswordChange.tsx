import React, { useState } from 'react'
import errorMessages from '../assets/texts/errorMessages'
import { updateUser } from '../services/dispatchers'
import Validator from '../services/validator'
import { Input } from './Input'

export const PasswordChange = () => {
	//Predefining the password object for the future
	const [passwordObj, setPasswordObj] = useState({ password: '' })

	const [passInputShown, setPassInputShown] = useState(false)

	//Setting local err state
	//This err array will have only names of the inputs where errors has happened, in our case only password field
	const [err, setErr] = useState<string[]>([])

	//Info message to be print to user
	//By default it is empty
	const [infoMessage, setInfoMessage] = useState({ message: '', type: '' })

	//Error messages local state
	//As initial state we are using array of error messages imported from the another file
	const [errorsMsg] = useState(errorMessages)

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 * @returns
	 */
	const passwordSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		//Cleaning input errors array
		setErr([])

		//Cleaning info message object
		setInfoMessage({ message: '', type: '' })

		//Getting validation result from our Validator class
		const validationResult = Validator.password(passwordObj.password, [])

		//If we have at least one problem with the user's input, we are stopping the function and setting input errors array
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}

		//If form has passed validation, then we are submitting it to the dispatcher.
		//Then we updating the global user state, and printing error message to the user
		updateUser(passwordObj).then((r) => {
			setInfoMessage({ message: r.message, type: 'info' })
		})
	}

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 * Function just toggles showing on and off password changed window
	 */
	const passwordShowHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setPassInputShown(true)
	}

	/**
	 * Function to control the password object state to be the same as user's input
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 */
	const passwordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value })
	}

	return (
		<div className='flex flex-col items-center justify-center w-full h-auto'>
			<button
				onClick={(e) => passwordShowHandler(e)}
				className={` ${
					passInputShown ? 'hidden' : 'flex'
				} items-center justify-center w-full h-8 font-sans text-sm duration-150 bg-white border-2 border-black hover:bg-gray-200`}
			>
				Change Password
			</button>
			<form className={`${passInputShown ? 'flex' : 'hidden'} flex-col h-3/4`}>
				<Input
					className='w-full h-8 px-4 mb-4 font-mono text-sm border-2 border-black focus:border-gray-500 focus:outline-none'
					name='password'
					type='password'
					placeholder='New Password'
					onChange={(e: React.ChangeEvent<HTMLInputElement>) => passwordValueHandler(e)}
				/>
				<div className={`${!passInputShown ? 'hidden' : 'flex'} text-mono text-xs justify-center items-center`}>
					<p className={`${infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'} `}>{infoMessage.message}</p>
					<p className={`${infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'} `}>
						{
							//This paragraph contains always the first info message out of all info messages
							err.length > 0 && errorsMsg.filter((e) => e.type === err[0])[0].message
						}
					</p>
				</div>
				<button
					onClick={(e) => passwordSubmitHandler(e)}
					className={`flex items-center justify-center w-full h-8 font-sans text-sm duration-150 bg-white border-2 border-black hover:bg-gray-200`}
				>
					Change Password
				</button>
			</form>
		</div>
	)
}

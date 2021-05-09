import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, register } from '../../services/dispatchers'
import { SET_USER } from '../../store/actions/userActions'
import Modal from './Modal'

export default function SignInUpModal() {
	const dispatch = useDispatch()
	const [newAccount, setNewAccount] = useState(false)

	const [accountData, setAccountData] = useState({ email: '', password: '', name: '' })

	const newAccountHandler = () => {
		setNewAccount(!newAccount)
	}

	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAccountData({ ...accountData, [e.target.name]: e.target.value })
	}

	const signUpHandler = () => {
		register(accountData).then((r) => {
			if (r.message === 'authenticated') {
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setErrMessage({ message: r.message })
		})
	}

	const signInHandler = () => {
		loginUser(accountData).then((r) => {
			if (r.message === 'authenticated') {
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setErrMessage({ message: r.message })
		})
	}

	const [errMessage, setErrMessage] = useState({ message: '' })

	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		newAccount ? signUpHandler() : signInHandler()
	}

	return (
		<Modal>
			<div
				className='fixed z-10 flex items-center justify-center w-3/4 text-xs bg-white border-4 border-black lg:w-1/3 h-5/6 bg-opacity-90'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='relative flex flex-col justify-between w-4/5 font-mono text-xs text-justify h-9/10 lg:h-4/5 text-opacity-80'>
					<form className='flex flex-col justify-around h-5/6'>
						<div className='h-48'>
							<label className='font-mono'>
								<input
									className='w-full h-12 px-4 mb-4 font-mono text-sm border-2 border-black focus:border-blue-500 focus:outline-none'
									name='email'
									type='email'
									placeholder='E-mail'
									onChange={(e) => valueHandler(e)}
								/>
							</label>
							<label className='font-mono'>
								<input
									className='w-full h-12 px-4 mb-4 font-mono text-sm border-2 border-black focus:border-blue-500 focus:outline-none'
									name='password'
									type='password'
									placeholder='Password'
									onChange={(e) => valueHandler(e)}
								/>
							</label>
							{newAccount && (
								<label className='font-mono'>
									<input
										className='w-full h-12 px-4 font-mono text-sm border-2 border-black focus:border-blue-500 focus:outline-none'
										name='name'
										type='text'
										placeholder='Your Name'
										onChange={(e) => valueHandler(e)}
									/>
								</label>
							)}
						</div>
						<div className='w-full text-lg text-justify h-18'>
							<p className='text-red-700'>{errMessage.message}</p>
						</div>
						<button
							onClick={(e) => submitHandler(e)}
							className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-blue-400'
						>
							{newAccount ? 'Sign Up!' : 'Sign In'}
						</button>
					</form>
					<label className='absolute font-sans bottom-4'>
						<input
							className='mr-3 font-mono'
							name='newAccount'
							type='checkbox'
							onChange={newAccountHandler}
						/>
						I don't have an account
					</label>
				</div>
			</div>
		</Modal>
	)
}

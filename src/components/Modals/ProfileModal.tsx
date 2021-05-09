import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { signout, updateUser } from '../../services/dispatchers'
import { SET_USER } from '../../store/actions/userActions'
import Modal from './Modal'

export default function ProfileModal() {
	const dispatch = useDispatch()
	const [passwordObj, setPasswordObj] = useState({ password: '' })
	const [passInputShown, setPassInputShown] = useState(false)
	const history = useHistory()

	const passwordSubmitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		updateUser(passwordObj).then((r) => {
			setInfoMessage({ message: r.message, type: 'info' })
		})
	}

	const signOutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		signout().then((r) => dispatch({ type: SET_USER, payload: r }))
		history.push('/')
	}

	const passwordShowHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setPassInputShown(true)
	}

	const passwordValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPasswordObj({ ...passwordObj, [e.target.name]: e.target.value })
	}

	const [infoMessage, setInfoMessage] = useState({ message: '', type: '' })
	return (
		<Modal>
			<div
				className='fixed z-10 flex items-center justify-center w-3/4 text-xs bg-white border-4 border-black lg:w-1/3 h-3/4 lg:h-2/3 bg-opacity-90'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex flex-col justify-between w-4/5 font-mono text-xs text-justify lg:font-sans h-9/10 lg:h-4/5 text-opacity-80'>
					<div className='flex flex-col items-center justify-center h-2/5'>
						<button
							onClick={(e) => passwordShowHandler(e)}
							className={` ${
								passInputShown ? 'hidden' : 'flex'
							} items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-blue-400`}
						>
							Change Password
						</button>
						<form className={`${passInputShown ? 'flex' : 'hidden'} flex-col h-3/4`}>
							<label className='font-mono'>
								<input
									className='w-full h-12 px-4 mb-4 font-mono text-sm border-2 border-black focus:border-blue-500 focus:outline-none'
									name='password'
									type='password'
									placeholder='New Password'
									onChange={(e) => passwordValueHandler(e)}
								/>
							</label>
							<div
								className={`${
									!passInputShown ? 'hidden' : 'flex'
								} text-mono justify-center items-center`}
							>
								<p className={`${infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'} `}>
									{infoMessage.message}
								</p>
							</div>
							<button
								onClick={(e) => passwordSubmitHandler(e)}
								className={`flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-blue-400`}
							>
								Change Password
							</button>
						</form>
					</div>
					<div
						className={`${
							passInputShown ? 'hidden' : 'flex'
						} w-full border-b border-black border-opacity-80`}
					></div>
					<div
						className={`${
							passInputShown ? 'hidden' : 'flex'
						} flex flex-col items-center justify-center h-2/5`}
					>
						<button
							onClick={(e) => signOutHandler(e)}
							className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-blue-400'
						>
							Exitini de le Accountini
						</button>
					</div>
					<div
						className={`${
							passInputShown ? 'hidden' : 'flex'
						} w-full border-b border-black border-opacity-80`}
					></div>
					<div
						className={`${
							passInputShown ? 'hidden' : 'flex'
						} flex flex-col items-center justify-center h-2/5`}
					>
						<Link
							to={'/working'}
							className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-blue-400'
						>
							Add item
						</Link>
					</div>
				</div>
			</div>
		</Modal>
	)
}

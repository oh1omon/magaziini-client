import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { signout } from '../../services/dispatchers'
import { SET_USER } from '../../store/actions/userActions'
import { PasswordChange } from '../PasswordChange'
import Modal from './Modal'

export default function ProfileModal() {
	const user = useSelector((state: IRootState) => state.user)
	const dispatch = useDispatch()
	const [passInputShown, setPassInputShown] = useState(false)
	const history = useHistory()

	const signOutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		signout().then((r) => dispatch({ type: SET_USER, payload: r }))
		history.push('/')
	}

	const passwordShowHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		setPassInputShown(true)
	}

	return (
		<Modal>
			<div
				className='fixed z-10 flex items-center justify-center w-3/4 text-xs bg-white border-4 border-black lg:w-1/3 h-3/4 lg:h-2/3 bg-opacity-90'
				onClick={(e) => e.stopPropagation()}
			>
				<div className='flex flex-col justify-between w-4/5 font-mono text-xs text-justify lg:font-sans h-9/10 lg:h-4/5 text-opacity-80'>
					<PasswordChange passInputShown={passInputShown} passwordShowHandler={passwordShowHandler} />
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
							className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-gray-200'
						>
							Exitini de le Accountini
						</button>
					</div>
					{user!.type === 'admin' && (
						<>
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
									className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-gray-200'
								>
									Add item
								</Link>
							</div>
						</>
					)}
				</div>
			</div>
		</Modal>
	)
}

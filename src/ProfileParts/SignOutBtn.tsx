import React from 'react'
import { useDispatch } from 'react-redux'
import { signOut } from '../services/dispatchers'
import { SET_USER } from '../store/actions/userActions'

export const SignOutBtn = () => {
	const dispatch = useDispatch()

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e Event
	 * Function sends signOut function call to the dispatcher, and after that updates user global state with null.
	 */
	const signOutHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		signOut().then((r) => dispatch({ type: SET_USER, payload: r }))
	}

	return (
		<button
			onClick={(e) => signOutHandler(e)}
			className={`flex items-center justify-center w-full h-8 font-sans text-sm duration-150 bg-white border-2 border-black hover:bg-gray-200`}
		>
			Sign Out
		</button>
	)
}

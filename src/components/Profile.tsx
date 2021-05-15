import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { signOut } from '../services/dispatchers'
import { SET_USER } from '../store/actions/userActions'
import { PasswordChange } from './PasswordChange'

//TODO desctruct
export const ProfilePart = ({ children }: IModalProps) => {
	return <div className={'lg:w-1/5 w-4/5 h-full flex justify-center items-center'}>{children}</div>
}

//TODO desctruct
export const CreateItemLink = () => {
	return (
		<Link
			to={'/addItem'}
			className={`flex items-center justify-center w-full h-8 font-sans text-sm duration-150 bg-white border-2 border-black hover:bg-gray-200`}
		>
			Add New Item
		</Link>
	)
}

//TODO desctruct
export const CheckOrdersLink = () => {
	return (
		<Link
			to={'/orders'}
			className={`flex items-center justify-center w-full h-8 font-sans text-sm duration-150 bg-white border-2 border-black hover:bg-gray-200`}
		>
			Check Orders
		</Link>
	)
}

//TODO desctruct
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

export const Profile = () => {
	//Retrieving user from the global state
	const user = useSelector((state: IRootState) => state.user)

	return (
		<div className={`w-full h-64 flex flex-row justify-center items-center`}>
			<div className={'lg:w-9/10 w-4/5 h-full flex flex-col lg:flex-row justify-around items-center '}>
				{user && (
					<>
						<ProfilePart children={<PasswordChange />} />
						{user!.type === 'admin' && <ProfilePart children={<CreateItemLink />} />}
						<ProfilePart children={<CheckOrdersLink />} />
						<ProfilePart children={<SignOutBtn />} />
					</>
				)}
			</div>
		</div>
	)
}

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import inputObjects from '../assets/texts/inputObjects'
import { updateUser } from '../services/dispatchers'
import { SET_USER } from '../store/actions/userActions'
import { WorkingInput } from './Working/ItemInput'
import { IRootState } from '../react-app-env'

export const UserUpdate = () => {
	const dispatch = useDispatch()

	//Getting user from global state
	const user = useSelector((state: IRootState) => state.user)

	//Setting local err state
	//This err array will have only names of the inputs where errors has happened
	// const [err, setErr] = useState<string[]>([])

	//Error message to be print to user
	//By default it is empty
	const [infoMessage, setInfoMessage] = useState({ type: '', message: '' })

	//Predefining the Sign In or Sign Up form for the future
	const [form, setForm] = useState({})

	//Inputs local state
	//As initial state we are using array of input objects imported from the another file
	const [inputs] = useState(inputObjects)

	//Error messages local state
	//As initial state we are using array of error messages imported from the another file
	// const [errMessages] = useState(errorMessages)

	/**
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 * Function to control the form state to be the same as user's input
	 */
	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	/**
	 * Function submits our form to the dispatcher
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 */
	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		//Updating profile and showing the result to the user
		updateUser(form).then((r) => {
			if (r.message === 'update successful') {
				setInfoMessage({ type: 'info', message: r.message })
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setInfoMessage({ type: 'err', message: r.message })
		})
	}

	return (
		<div className='z-10 flex items-center justify-center  overflow-y-scroll lg:overscroll-none text-xs bg-white w-full min-h-hero'>
			<div className='relative flex flex-col justify-between items-center w-4/5 font-mono lg:font-sans text-xs text-justify h-140 lg:h-160 text-opacity-80 my-12'>
				<form className='flex flex-col justify-around w-5/6 lg:w-3/5 h-5/6'>
					<div className='h-140'>
						{inputs
							.filter((input) => input.name !== 'email')
							.map((i) => (
								<WorkingInput
									label={i.placeholder}
									key={i.name}
									className={i.className}
									type={i.type}
									name={i.name}
									defaultValue={(user as any)[i.name]}
									changeHandler={valueHandler}
									err={false}
								/>
							))}
					</div>
					<div className='w-full text-lg text-justify h-18'>
						<p className={`${infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'}`}>
							{infoMessage.message}
						</p>
					</div>
					<button
						onClick={(e) => submitHandler(e)}
						className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-gray-200'
					>
						Update
					</button>
				</form>
			</div>
		</div>
	)
}

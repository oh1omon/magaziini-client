import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import errorMessages from '../../assets/texts/errorMessages'
import inputObjects from '../../assets/texts/inputObjects'
import { loginUser, register } from '../../services/dispatchers'
import Validator from '../../services/validator'
import { SET_USER } from '../../store/actions/userActions'
import { Input } from '../Input'
import Modal from './Modal'

export default function SignInUpModal() {
	const dispatch = useDispatch()

	//Setting state to toggle newAccount field
	//By default it is False
	const [newAccount, setNewAccount] = useState(false)

	//Setting local err state
	//This err array will have only names of the inputs where errors has happened
	const [err, setErr] = useState<string[]>([])

	//Error message to be print to user
	//By default it is empty
	const [errMessage, setErrMessage] = useState({ message: '' })

	//Predefining the Sign In or Sign Up form for the future
	const [form, setForm] = useState<ISignInUpFormState>({ email: '', password: '', name: '' })

	//Inputs local state
	//As initial state we are using array of input objects imported from the another file
	const [inputs, setInputs] = useState(inputObjects)

	//Error messages local state
	//As initial state we are using array of error messages imported from the another file
	const [errMessages] = useState(errorMessages)

	/**
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e
	 * Function to control the form state to be the same as user's input
	 */
	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	/**
	 * Function controls which input fields to show to the user
	 * Another words, it toggles name input field on or off
	 */
	const signInChangeHandler = () => {
		//Toggling new account state
		setNewAccount(!newAccount)

		//Getting index of name input object in the inputs state
		const nameInputIndex = inputs.findIndex((input) => input.name === 'name')!

		//Creating a new name input field based on the one in the state
		const input = inputs[nameInputIndex]

		//Toggling the input's activated value
		input.activated = !input.activated

		//Here we changing old name input field version with new, toggled one
		inputs.splice(nameInputIndex, 1, input)

		//Updating the state
		setInputs([...inputs])

		//If we are toggling from Sign Up to Sign In, then we need to delete name field from the form state
		const prevForm = form
		if (prevForm.name) {
			delete prevForm['name']
		}

		//Updating new form state
		setForm(prevForm)
	}

	/**
	 *
	 * Function is handling all the sign in logic from validating form to submitting it to the dispatcher
	 */
	const signInHandler = () => {
		//Cleaning input errors array
		setErr([])

		//Getting validation result from our Validator class
		const validationResult = Validator.signIn(form)

		//If we have at least one problem with the user's input, we are stopping the function and setting input errors array
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}

		//If form has passed validation, then we are submitting it to the dispatcher.
		//Then depending on the result we gain from the server, we either updating the global user state, or printing error message to the user
		loginUser(form).then((r) => {
			if (r.message === 'authenticated') {
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setErrMessage({ message: r.message })
		})
	}

	/**
	 *
	 * Function is handling all the sign up logic from validating form to submitting it to the dispatcher
	 */
	const signUpHandler = () => {
		//Cleaning input errors array
		setErr([])

		//Getting validation result from our Validator class
		const validationResult = Validator.signUp(form)

		//If we have at least one problem with the user's input, we are stopping the function and setting input errors array
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}

		//If form has passed validation, then we are submitting it to the dispatcher.
		//Then depending on the result we gain from the server, we either updating the global user state, or printing error message to the user
		register(form).then((r) => {
			if (r.message === 'authenticated' || r.message === 'User created!') {
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setErrMessage({ message: r.message })
		})
	}

	/**
	 * Function just toggles new Account state on or off
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 */
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
							{inputs
								.filter((input) => input.activated)
								.map((i) => (
									<Input
										key={i.name}
										className={i.className}
										type={i.type}
										name={i.name}
										placeholder={i.placeholder}
										onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueHandler(e)}
										err={err.includes(i.name)}
									/>
								))}
						</div>
						<div className='w-full text-lg text-justify h-18'>
							<p className='text-red-700'>{errMessage.message}</p>
							<p className='text-red-700'>
								{
									//This paragraph contains always the first error message out of all error messages
								}
								{err.length > 0 && errMessages.filter((e) => e.type === err[0])[0].message}
							</p>
						</div>
						<button
							onClick={(e) => submitHandler(e)}
							className='flex items-center justify-center w-full h-12 font-sans text-xl duration-150 bg-white border-2 border-black hover:bg-gray-200'
						>
							{newAccount ? 'Sign Up!' : 'Sign In'}
						</button>
					</form>
					<Input
						className={'mr-3 font-mono'}
						type={'checkbox'}
						name='newAccount'
						onChange={signInChangeHandler}
						labelClassName={'absolute font-sans bottom-4'}
						value={"I don't have an account"}
					/>
				</div>
			</div>
		</Modal>
	)
}

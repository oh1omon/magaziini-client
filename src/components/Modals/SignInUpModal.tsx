import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser, register } from '../../services/dispatchers'
import Validator from '../../services/validator'
import { SET_USER } from '../../store/actions/userActions'
import { Input } from '../Items/Input'
import Modal from './Modal'

export default function SignInUpModal() {
	const dispatch = useDispatch()
	const [newAccount, setNewAccount] = useState(false)
	const [err, setErr] = useState<string[]>([])
	const [errMessage, setErrMessage] = useState({ message: '' })
	const [form, setForm] = useState<ISignInUpFormState>({ email: '', password: '', name: '' })

	const [inputs, setInputs] = useState([
		{
			className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
			name: 'email',
			type: 'email',
			placeholder: 'E-mail',
			activated: true,
		},
		{
			className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
			name: 'password',
			type: 'password',
			placeholder: 'Password',
			activated: true,
		},
		{
			className: `w-full h-12 px-4 mb-4 font-mono text-sm border-2 focus:border-gray-500 focus:outline-none`,
			name: 'name',
			type: 'text',
			placeholder: 'Your name',
			activated: false,
		},
	])

	//Error messages
	const [errorsMsg] = useState([
		{ type: 'email', message: 'You have provided invalid email' },
		{
			type: 'password',
			message: 'Password has to be at least 8 characters',
		},
		{
			type: 'name',
			message: 'Please give us your name',
		},
	])

	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	const signUpHandler = () => {
		setErr([])
		const validationResult = Validator.signUp(form)
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}
		register(form).then((r) => {
			if (r.message === 'authenticated' || r.message === 'User created!') {
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setErrMessage({ message: r.message })
		})
	}
	const signInChangeHandler = () => {
		setNewAccount(!newAccount)
		const nameInputIndex = inputs.findIndex((input) => input.name === 'name')!
		const nameInput = inputs[nameInputIndex]
		nameInput.activated = !nameInput.activated
		inputs.splice(nameInputIndex, 1, nameInput)
		setInputs([...inputs])
		const prevForm = form
		if (prevForm.name) {
			delete prevForm['name']
		}
		setForm(prevForm)
	}

	const signInHandler = () => {
		setErr([])
		const validationResult = Validator.signIn(form)
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}
		loginUser(form).then((r) => {
			if (r.message === 'authenticated') {
				return dispatch({ type: SET_USER, payload: r.user })
			}
			setErrMessage({ message: r.message })
		})
	}

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
								{err.length > 0 && errorsMsg.filter((e) => e.type === err[0])[0].message}
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

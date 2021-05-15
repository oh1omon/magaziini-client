import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import itemErrors from '../../assets/texts/itemErrors'
import itemInputs from '../../assets/texts/itemInputs'
import { addItem, retrieveItems } from '../../services/dispatchers'
import Validator from '../../services/validator'
import { SET_ITEMS } from '../../store/actions/itemActions'
import { Textarea } from './Textarea'
import { WorkingInput } from './WorkingInput'

export default function Working() {
	//Creating local state for th form
	const [form, setForm] = useState<ICreateItemProps>({})

	//Creating local state for information messages
	const [info, setInfo] = useState({ type: '', message: '' })

	//Error messages local state
	//As initial state we are using array of error messages imported from the another file
	const [errMessages] = useState(itemErrors)

	//Inputs local state
	//As initial state we are using array of input objects imported from the another file
	const [inputs] = useState(itemInputs)

	//Setting local err state
	//This err array will have only names of the inputs where errors has happened
	const [err, setErr] = useState<string[]>([])

	const dispatch = useDispatch()

	/**
	 *
	 * @param {React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>} e
	 * Updates form state according to the user's input
	 */
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
		e.preventDefault()
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e
	 * Handles item form validation checking and then controls it's submitting to the dispatcher
	 */
	const sendHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		//Cleaning input errors array
		setErr([])

		//Getting validation result from our Validator class
		const validationResult = Validator.createItem(form)

		//If we have at least one problem with the user's input, we are stopping the function and setting input errors array
		if (validationResult.length > 0) {
			setErr(validationResult)
			return
		}

		//Creating a new form object based on form state
		const formObject = form

		//Since size input is just a string we need to create an array of {string} sizes
		formObject.sizes = formObject.sizes!.toString().split(' ')

		//If form has passed validation, then we are submitting it to the dispatcher.
		//Then depending on the result we gain from the server, we either updating the global user state, or printing error message to the user
		addItem(formObject).then((r) => {
			retrieveItems().then((resp) => dispatch({ type: SET_ITEMS, payload: resp }))
			setInfo({ type: r.type, message: r.message })
		})
	}

	return (
		<div
			className='z-10 flex items-center justify-center lg:overscroll-none text-xs bg-white w-full min-h-hero'
			onClick={(e) => e.stopPropagation()}
		>
			<div className='relative flex flex-col justify-between items-center w-4/5 font-mono lg:font-sans text-xs text-justify h-auto my-12'>
				<div className='w-full h-auto lg:w-4/5 flex md:flex-row flex-col justify-between'>
					<div className='flex items-center justify-center w-full h-140 md:w-2/5'>
						{form.photo ? (
							<img
								src={form?.photo}
								alt={' you have just uploaded'}
								className='object-scale-down w-auto h-auto border border-black lg:object-cover filter grayscale-40'
							/>
						) : (
							<label
								className='object-scale-down w-auto h-auto border border-black lg:object-cover filter grayscale-40'
								htmlFor={'photo'}
							>
								Paste image photo to preview it
							</label>
						)}
					</div>
					<form className='flex flex-col justify-between h-140 w-auto lg:w-2/5 '>
						{inputs.map((i) =>
							i.type === 'textarea' ? (
								<Textarea
									key={i.name}
									name={i.name}
									className={i.className}
									err={err.includes(i.name)}
									changeHandler={changeHandler}
									label={i.label}
								/>
							) : (
								<WorkingInput
									key={i.name}
									name={i.name}
									type={i.type}
									className={i.className}
									err={err.includes(i.name)}
									changeHandler={changeHandler}
									label={i.label}
								/>
							)
						)}
						<div className='flex flex-col items-baseline mb-4 lg:mb-0'>
							<label htmlFor={'sex'}>Sex</label>
							<select
								onChange={(e) => changeHandler(e)}
								id={'sex'}
								name={'sex'}
								className={`border-2 font-mono text-sm w-3/4 h-1/2 tracking-wide lg:text-sm ${
									err.includes('sex') ? 'border-red-700' : 'border-black'
								}`}
							>
								<option value=''>Select sex</option>
								<option value={'w'}>Female</option>
								<option value={'m'}>Male</option>
							</select>
						</div>

						<div className='mb-4 lg:mb-0'>
							<p
								className={`${
									info.type === 'info' ? 'text-blue-700' : 'text-red-700'
								} font-mono text-xs text-justify lg:text-sm`}
							>
								{info.message}
							</p>
							<p className='text-red-700'>
								{
									//This paragraph contains always the first error message out of all error messages
									err.length > 0 && errMessages.filter((e) => e.type === err[0])[0].message
								}
							</p>
						</div>
						<div className='flex flex-row justify-between w-full mb-4 lg:mb-0'>
							<button
								onClick={(e) => {
									sendHandler(e)
								}}
								className='flex items-center justify-center w-3/5 py-1 font-sans text-xl duration-150 bg-white border-2 border-black xl:w-3/4 xl:py-2 xl:text-2xl hover:bg-gray-200'
							>
								Create
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	)
}

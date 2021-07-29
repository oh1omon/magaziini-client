import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import errorMessages from '../assets/texts/errorMessages'
import orderObjects from '../assets/texts/orderInputs'
import { createOrder, retrieveItem } from '../services/dispatchers'
import Validator from '../services/validator'
import { BackBtn } from './BackBtn'
import FavButton from './FavButton'
import { Input } from './Input'
import Loader from './Loader'
import { ICreateOrderProps, IITem, IRootState } from '../react-app-env'

export const Item = () => {
	const history = useHistory()

	//Fetching user from global state
	const user = useSelector((state: IRootState) => state.user)

	//Creating local state for the item, that is shown here
	const [item, setItem] = useState<IITem>({} as IITem)

	//Setting local err state
	//This err array will have only names of the inputs where errors has happened
	const [err, setErr] = useState<string[]>([])

	//Inputs local state
	//As initial state we are using array of input objects imported from the another file
	const [inputs, setInputs] = useState(orderObjects)

	//Error messages local state
	//As initial state we are using array of error messages imported from the another file
	const [errMessages] = useState(errorMessages)

	//Local state keeping boolean.
	//According to this bool we will show form or description
	const [showForm, setShowForm] = useState(false)

	//Loader state
	//When component mounts it is true and changed later
	const [isLoading, setIsLoading] = useState(true)

	//InfoMessage prints to the user current situation with the actions he has dispatched
	const [infoMessage, setInfoMessage] = useState({ message: '', type: '' })

	//We get right id of this item from the link
	//It is needed for us to create an order, if the user decides to but this item
	let { id } = useParams<{ id: string }>()

	//Order form
	//Id is predefined from the link
	const [order, setOrder] = useState<ICreateOrderProps>({
		itemId: `${id}`,
	})

	/**
	 *
	 * @param {React.ChangeEvent<HTMLInputElement>} e Event
	 * Function updates the local state according to the user actions
	 */
	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrder({ ...order, [e.target.name]: e.target.value })
	}

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e Event
	 * Function checks form for problems, and sending the order form to the actual dispatcher, then depending on the result sets infoMessage to show the user if the order has been created or not
	 */
	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

		//Cleaning input errors array
		setErr([])
		setInfoMessage({ type: '', message: '' })

		//Getting validation result from our Validator class
		const validationResult = Validator.order(order)

		//If user has not mentioned the size we will show him error about that
		if (validationResult.find((e) => e === 'size')) {
			setInfoMessage({ type: 'err', message: 'please, mention the size' })
			return
		}

		//If user's input has any problems, we will work with them in this script
		if (validationResult.length !== 0) {
			//If form is already shown, then we setting error to be shown
			if (showForm) {
				setErr(validationResult)
				setInfoMessage({
					type: 'err',
					message: errMessages.filter((e) => e.type === validationResult[0])[0].message,
				})
				return
			}

			//If form has not been shown before, then we will show inputs, that are needed for order
			setShowForm(true)
			setInputs(inputs.filter((i: any) => validationResult.find((r) => r === i.name)))
			return
		}

		//If no problems found during validation, then we will create and order
		createOrder({ ...order }).then((r) => {
			setInfoMessage({ message: r.message, type: 'info' })
		})
	}

	/**
	 *
	 * @param {React.MouseEvent<HTMLButtonElement, MouseEvent>} e Event
	 * Function returns us back to the item selection
	 */
	const backHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		history.goBack()
	}

	//Item retrieving is called only once, when component is mounted, since it's dependency list consists of only id, which is only one for every component
	//After retrieving item from the server we set loader to false and then render the actual item
	useEffect(() => {
		retrieveItem(id).then((r) => {
			setIsLoading(false)
			setItem(r)
		})
	}, [id])

	useEffect(() => {
		setOrder({ ...order, name: user?.name, street: user?.street, city: user?.city, country: user?.country })
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<div className='relative flex items-center justify-center  overflow-y-scroll lg:overscroll-none text-xs bg-white w-full min-h-hero'>
			<div
				className={`flex flex-col lg:flex-row items-center ${
					isLoading ? 'justify-center' : 'justify-between'
				} w-4/5 h-4/5 text-xs`}
			>
				{isLoading ? (
					<Loader />
				) : item ? (
					<>
						<BackBtn backHandler={backHandler} />
						<div className='flex items-center justify-center w-full h-140 lg:w-2/5'>
							<img
								src={`${item.image}`}
								alt={`${item?.name}`}
								className='object-scale-down w-auto lg:w-4/5 h-auto border border-black lg:object-cover filter grayscale-40'
							/>
						</div>

						<div className='w-full h-128 lg:h-140 lg:w-2/5'>
							<form className='flex flex-col justify-between h-full'>
								<div className='mb-4 lg:mb-0'>
									<h1 className='font-sans text-4xl tracking-wide uppercase'>{item!.name}</h1>
								</div>
								{showForm ? (
									<div className='h-auto'>
										{inputs.map((i) => (
											<Input
												key={i.name}
												className={i.className}
												type={i.type}
												name={i.name}
												placeholder={i.placeholder}
												onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
													valueHandler(e)
												}
												err={err.includes(i.name)}
											/>
										))}
									</div>
								) : (
									<>
										<div className='mb-4 lg:mb-0'>
											<p className='font-mono text-xs text-justify lg:text-sm text-opacity-80'>
												{item!.description}
											</p>
										</div>
										<div className='flex items-baseline mb-4 lg:mb-0'>
											<div className='flex space-x-2 text-sm font-bold leading-none text-center text-gray-500 lg:space-x-5 lg:text-lg'>
												{item.sizes &&
													typeof item.sizes !== 'string' &&
													item.sizes.map((s: string) => (
														<Input
															labelClassName={`p-2 font-mono cursor-pointer
															${order?.size === s && 'text-black'}
															`}
															key={s}
															className='fixed w-0 opacity-0'
															name='size'
															type='radio'
															value={s}
															onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
																valueHandler(e)
															}
														/>
													))}
											</div>
										</div>
									</>
								)}
								<div className='mb-4 lg:mb-0'>
									<h2 className='font-mono text-lg tracking-wide lg:text-2xl'>{item!.price}€</h2>
								</div>
								<div className='mb-4 lg:mb-0'>
									<p
										className={`${
											infoMessage.type === 'info' ? 'text-blue-700' : 'text-red-700'
										} font-mono text-xs text-justify lg:text-sm`}
									>
										{infoMessage.message}
									</p>
								</div>
								<div className='flex flex-row justify-between w-full mb-4 lg:mb-0'>
									<button
										onClick={(e) => submitHandler(e)}
										className='flex items-center justify-center w-3/5 py-1 font-sans text-xl duration-150 bg-white border-2 border-black xl:w-3/4 xl:py-2 xl:text-2xl hover:bg-gray-200'
									>
										{showForm ? 'Buy' : 'Continue'}
									</button>
									<FavButton id={item._id} />
								</div>
							</form>
						</div>
					</>
				) : (
					<Redirect to={'/error'} />
				)}
			</div>
		</div>
	)
}

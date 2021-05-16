import React, { useEffect, useState } from 'react'
import { Redirect, useHistory, useParams } from 'react-router-dom'
import { createOrder, retrieveItem } from '../services/dispatchers'
import { BackBtn } from './BackBtn'
import FavButton from './FavButton'
import { Input } from './Input'
import Loader from './Loader'

export const Item = () => {
	//Creating local state for the item, that is shown here
	const [item, setItem] = useState<IITem>({} as IITem)

	const history = useHistory()

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
	const [order, setOrder] = useState({
		itemId: `${id}`,
		size: '',
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
	 * Function sending the order form to the actual dispatcher, then depending on the result sets infoMessage to show the user if the order has been created or not
	 */
	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()

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

	return (
		<div className='relative z-10 flex items-center justify-center  overflow-y-scroll lg:overscroll-none text-xs bg-white w-full min-h-hero'>
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
								<div className='mb-4 lg:mb-0'>
									<p className='font-mono text-xs text-justify lg:text-sm text-opacity-80'>
										{item!.description}
									</p>
								</div>
								<div className='flex items-baseline mb-4 lg:mb-0'>
									<div className='flex space-x-2 text-sm font-bold leading-none text-center text-gray-500 lg:space-x-5 lg:text-lg'>
										{item.sizes &&
											typeof item.sizes !== 'string' &&
											item.sizes.map((s) => (
												<Input
													labelClassName={`p-2 font-mono cursor-pointer
															${order.size === s && 'text-black'}
															`}
													key={s}
													className='fixed w-0 opacity-0'
													name='size'
													type='radio'
													value={s}
													id={s}
													onChange={(e: React.ChangeEvent<HTMLInputElement>) => valueHandler(e)}
												/>
											))}
									</div>
								</div>
								<div className='mb-4 lg:mb-0'>
									<h2 className='font-mono text-lg tracking-wide lg:text-2xl'>{item!.price}$</h2>
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
										Buy
									</button>
									<FavButton id={item!._id} />
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

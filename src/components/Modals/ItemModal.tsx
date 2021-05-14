import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { createOrder, retrieveItem } from '../../services/dispatchers'
import FavButton from '../FavButton'
import { Input } from '../Input'
import Loader from '../Loader'
import Modal from './Modal'

export default function ItemModal() {
	const user = useSelector((store: IRootState) => store.user)
	const [item, setItem] = useState<IITem>({} as IITem)
	const [isLoading, setIsLoading] = useState(true)
	const [infoMessage, setInfoMessage] = useState({ message: '', type: '' })
	let { id } = useParams<{ id: string }>()

	const [order, setOrder] = useState({
		itemId: `${id}`,
		size: '',
	})

	const valueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrder({ ...order, [e.target.name]: e.target.value })
		console.log(e.target.value)
	}

	const submitHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (user)
			createOrder({ ...order }).then((r) => {
				setInfoMessage({ message: r.message, type: 'info' })
			})
	}

	useEffect(() => {
		retrieveItem(id).then((r) => {
			setIsLoading(false)
			setItem(r)
		})
	}, [id])

	return (
		<Modal>
			<div
				className='fixed z-10 flex items-center justify-center w-3/4 overflow-y-scroll text-xs bg-white border-4 border-black lg:w-2/3 h-9/10 bg-opacity-90'
				onClick={(e) => e.stopPropagation()}
			>
				<div
					className={`flex flex-col lg:flex-row items-center ${
						isLoading ? 'justify-center' : 'justify-between'
					} w-4/5 h-auto lg:h-4/5 text-xs`}
				>
					{isLoading ? (
						<Loader />
					) : (
						<>
							<div className='flex items-center justify-center w-auto h-auto mb-4 lg:mb-0 lg:w-2/5'>
								<img
									src={`${item.image}`}
									alt={`${item?.name}`}
									className='object-scale-down w-full border border-black lg:object-cover lg:h-full filter grayscale-40'
								/>
							</div>
							<div className='w-full h-full lg:w-2/5'>
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
														onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
															valueHandler(e)
														}
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
										{user ? (
											<button
												onClick={(e) => submitHandler(e)}
												className='flex items-center justify-center w-3/5 py-1 font-sans text-xl duration-150 bg-white border-2 border-black xl:w-3/4 xl:py-2 xl:text-2xl hover:bg-gray-200'
											>
												Buy
											</button>
										) : (
											<Link
												className='flex items-center justify-center w-3/5 py-1 font-sans text-xl duration-150 bg-white border-2 border-black xl:w-3/4 xl:py-2 lg:text-xl xl:text-2xl hover:bg-gray-200'
												to='/user'
											>
												Sign In first
											</Link>
										)}
										<FavButton id={item!._id} />
									</div>
								</form>
							</div>
						</>
					)}
				</div>
			</div>
		</Modal>
	)
}

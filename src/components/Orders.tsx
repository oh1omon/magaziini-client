import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { retrieveOrders } from '../services/dispatchers'
import Loader from './Loader'

export const Orders = () => {
	const user = useSelector((state: IRootState) => state.user)

	//Creating local state for the orders, that is shown here
	const [orders, setOrders] = useState<IOrder[]>([])

	//Retrieving items from the global state
	const items = useSelector((state: IRootState) => state.items)

	//Loader state
	//When component mounts it is true and changed later
	const [isLoading, setIsLoading] = useState(true)

	//Orders retrieving is called only once, when component is mounted
	//After retrieving orders from the server we set loader to false and then render the actual item
	useEffect(() => {
		retrieveOrders().then((r) => {
			r.orders && r.orders.length > 0 && setOrders(r.orders)
			setIsLoading(false)
		})
	}, [])

	return (
		<div className='z-10 flex items-center justify-center overflow-y-scroll lg:overscroll-none text-xs bg-white w-full min-h-hero'>
			<div
				className={`flex flex-col items-center ${isLoading ? 'justify-center' : 'justify-between'} w-9/10 h-9/10 text-xs`}
			>
				{isLoading ? (
					<Loader />
				) : orders.length > 0 ? (
					<div className={'w-full h-full overflow-x-auto overflow-y-auto text-xs '}>
						<table className={'w-full border-collapse'}>
							<thead>
								<tr className={''}>
									<th className={'text-left p-4 border-black border-2'}>Item ID</th>
									<th className={'text-left p-4 border-black border-2'}>Item Name</th>
									{user?.type === 'admin' && (
										<th className={'text-left p-4 border-black border-2'}>Buyer Id</th>
									)}
									<th className={'text-left p-4 border-black border-2'}>Buyer Name</th>
									<th className={'text-left p-4 border-black border-2'}>Street</th>
									<th className={'text-left p-4 border-black border-2'}>City</th>
									<th className={'text-left p-4 border-black border-2'}>Country</th>
									<th className={'text-left p-4 border-black border-2'}>Size</th>
									<th className={'text-left p-4 border-black border-2'}>Price</th>
								</tr>
							</thead>
							<tbody>
								{orders.map((o) => (
									<tr key={o.itemId} className={''}>
										<td className={'p-4 border-black border-2'}>
											<div>{o.itemId}</div>
										</td>
										<td className={'p-4 border-black border-2 uppercase text-gray-600'}>
											<Link to={`/item/${o.itemId}`}>
												{items?.find((item) => item._id === o.itemId)?.name}
											</Link>
										</td>
										{user?.type === 'admin' && (
											<td className={'p-4 border-black border-2'}>
												<div>{o.submitter || 'anonymous'}</div>
											</td>
										)}
										<td className={'p-4 border-black border-2'}>
											<div>{o.submitterName || 'anonymous'}</div>
										</td>
										<td className={'p-4 border-black border-2'}>
											<div>{o.street || 'anonymous'}</div>
										</td>
										<td className={'p-4 border-black border-2'}>
											<div>{o.city || 'anonymous'}</div>
										</td>
										<td className={'p-4 border-black border-2'}>
											<div>{o.country || 'anonymous'}</div>
										</td>
										<td className={'p-4 border-black border-2'}>
											<div>{o.size}</div>
										</td>
										<td className={'p-4 border-black border-2'}>
											<div>{`${items?.find((item) => item._id === o.itemId)?.price}€`}</div>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<div>
						<h1 className={'text-3xl'}>Looks like you haven't bought anything yet!</h1>
					</div>
				)}
			</div>
		</div>
	)
}

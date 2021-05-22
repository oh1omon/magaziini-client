import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import ItemCard from './ItemsCard'

const Items = () => {
	//Retrieving items array from the state
	const items = useSelector((state: IRootState) => state.items)

	//Retrieving sex identifier to filter only selected items
	const sex = useSelector((state: IRootState) => state.sex)

	return (
		<div className='flex flex-wrap justify-center w-full h-auto' id='items'>
			{items ? (
				items!
					.filter((item) => item.sex.includes(sex))
					.map((item) => (
						<ItemCard
							key={item._id}
							id={item._id}
							name={item.name}
							description={item.description}
							img={item.image}
							url={`item/${item._id}#top`}
							price={item.price}
						/>
					))
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Items

// import Loader from '../Loader/Loader'
import React from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import ItemCard from './ItemsCard'

const Items = ({ sex, favs, setFavs }: IMainProps) => {
	const items = useSelector((state: IRootState) => state.items)

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
							url={`item/${item._id}`}
							price={item.price}
							favs={favs}
							setFavs={setFavs}
						/>
					))
			) : (
				<Loader />
			)}
		</div>
	)
}

export default Items

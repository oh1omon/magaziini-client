// import Loader from '../Loader/Loader'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Loader from '../Loader'
import ItemCard from './ItemsCard'

const Items = ({ sex, favs, setFavs }: IMainProps) => {
	const [isLoading, setIsLoading] = useState(true)

	const items = useSelector((state: IRootState) => state.items)

	// useEffect(() => {
	// 	axios.get('http://localhost:3002/db').then((response) => {
	// 		setItems(response.data)
	// 		setIsLoading(false)
	// 	})
	// }, [])

	return (
		<div className='flex flex-wrap justify-center w-full h-auto' id='items'>
			{isLoading && <Loader />}
			{items &&
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
					))}
		</div>
	)
}

export default Items

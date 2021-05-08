// import Loader from '../Loader/Loader'
import React, { useState } from 'react'
import ItemCard from './ItemsCard'

const Items = ({ sex, favs, setFavs }:IMainProps) => {
	// const [items, setItems] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	// useEffect(() => {
	// 	axios.get('http://localhost:3002/db').then((response) => {
	// 		setItems(response.data)
	// 		setIsLoading(false)
	// 	})
	// }, [])

	return (
		<div className='flex flex-wrap justify-center w-full h-auto' id='items'>
			{isLoading ? (
				// <Loader />
			) : (
				items
					.filter((item) => item.sex.includes(sex))
					.map((item) => (
						<ItemCard
							key={item.id}
							id={item.id}
							name={item.name}
							description={item.description}
							amount={item.amount}
							img={item.img}
							url={`item/${item.id}`}
							price={item.price}
							favs={favs}
							setFavs={setFavs}
						/>
					))
			)}
		</div>
	)
}

export default Items

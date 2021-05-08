// import Loader from '../Loader/Loader'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ITEMS } from '../../store/actions/itemActions'
import Loader from '../Loader'
import ItemCard from './ItemsCard'

const Items = ({ sex, favs, setFavs }: IMainProps) => {
	const [isLoading, setIsLoading] = useState(true)

	const dispatch = useDispatch()
	const items = useSelector((state: IRootState) => state.items)

	useEffect(() => {
		axios.get('https://mag-api.herokuapp.com/api/item').then((r) => {
			//TODO make checking if the right data is downloaded
			dispatch({ type: SET_ITEMS, payload: r.data })
		})
		setIsLoading(false)
	}, [dispatch])

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

import React from 'react'
import Hero from './Hero'
import Items from './Items/Items'

const Main = ({ sex, favs, setFavs }: IMainProps) => {
	return (
		<div>
			<Hero />
			<Items sex={sex} favs={favs} setFavs={setFavs} />
		</div>
	)
}

export default Main

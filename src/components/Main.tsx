import React from 'react'
import Hero from './Hero'
import Items from './Items/Items'

const Main = ({ sex }: IMainProps) => {
	return (
		<div>
			<Hero />
			<Items sex={sex} />
		</div>
	)
}

export default Main

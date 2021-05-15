import React from 'react'
import Hero from './Hero'
import Items from './Items/Items'

const Main = () => {
	return (
		<div className={'font-sans text-sm xl:text-2xl'}>
			<Hero />
			<Items />
		</div>
	)
}

export default Main

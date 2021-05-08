import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/Header'

export const App = () => {
	const user = useSelector((state: IRootState) => state.user)

	const [favs, setFavs] = useState(JSON.parse(window.localStorage.getItem('favorite')!) || [])

	useEffect(() => {
		localStorage.setItem('favorite', JSON.stringify(favs))
	}, [favs])

	const [sex, setSex] = useState('all')
	return (
		<Router>
			<div id='top'></div>
			<div className='font-sans text-sm xl:text-2xl'>
				<Header user={user} sex={sex} setSex={setSex} />
			</div>
		</Router>
	)
}

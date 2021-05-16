import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { ErrorPage } from './components/ErrorPage'
import Footer from './components/Footer'
import Header from './components/Header'
import { Delivery } from './components/InfoWindows/Delivery'
import { History } from './components/InfoWindows/History'
import { News } from './components/InfoWindows/News'
import { Payment } from './components/InfoWindows/Payment'
import { Returns } from './components/InfoWindows/Returns'
import { Item } from './components/Item'
import Main from './components/Main'
import { NewsButton } from './components/NewsButton'
import { Orders } from './components/Orders'
import SignInUp from './components/SignInUp'
import Working from './components/Working/CreateItem'
import Update from './components/Working/UpdateItem'
import { retrieveItems, retrieveUser } from './services/dispatchers'
import { SET_FAVS } from './store/actions/favActions'
import { SET_ITEMS } from './store/actions/itemActions'
import { SET_USER } from './store/actions/userActions'

export const App = () => {
	const dispatch = useDispatch()

	//Retrieving user from the global state
	const user = useSelector((state: IRootState) => state.user)

	//Creating local state for showing or not NewsButton
	const [showNews, setShowNews] = useState(true)

	//Retrieving all items from DB to put them into global state
	useEffect(() => {
		retrieveItems().then((r) => dispatch({ type: SET_ITEMS, payload: r }))
	}, [dispatch])

	//Retrieving user from DB to put him into global state
	useEffect(() => {
		retrieveUser().then((r) => {
			dispatch({ type: SET_USER, payload: r })
		})
	}, [dispatch])

	//Retrieving all favs from local storage or creating empty array, and putting them into global state
	useEffect(() => {
		dispatch({ type: SET_FAVS, payload: JSON.parse(window.localStorage.getItem('favorite')!) || [] })
	}, [dispatch])

	//So, if user has already clicked NewsButton, then localStorage now has an newsShown value set, and we are not showing this button him anymore
	useEffect(() => {
		if (window.localStorage.getItem('newsShown')) {
			setShowNews(false)
		}
	}, [])

	return (
		<Router>
			<div id='top'></div>
			<Header />
			{showNews && <NewsButton setShowNews={setShowNews} />}
			<Switch>
				<Route exact path={'/'}>
					<Main />
				</Route>
				<Route path={'/login'}>{user ? <Redirect to={'/'} /> : <SignInUp />}</Route>
				<Route path={`/item/:id`}>
					<Item />
				</Route>
				<Route path={'/delivery'}>
					<Delivery />
				</Route>
				<Route path={'/payment'}>
					<Payment />
				</Route>
				<Route path={'/history'}>
					<History />
				</Route>
				<Route path={'/returns'}>
					<Returns />
				</Route>
				<Route path={'/orders'}>
					<Orders />
				</Route>
				<Route path={'/additem'}>{user && user.type === 'admin' ? <Working /> : <Redirect to={'/'} />}</Route>
				<Route path={'/updateitem/:id'}>{user && user.type === 'admin' ? <Update /> : <Redirect to={'/'} />}</Route>
				<Route path={'/news'}>
					<News />
				</Route>
				<Route path={'/*'}>
					<ErrorPage />
				</Route>
			</Switch>
			<Footer />
		</Router>
	)
}

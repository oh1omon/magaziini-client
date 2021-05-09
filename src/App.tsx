import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import Main from './components/Main'
import DeliveryModal from './components/Modals/DeliveryModal'
import HistoryModal from './components/Modals/HistoryModal'
import ItemModal from './components/Modals/ItemModal'
import PaymentModal from './components/Modals/PaymentModal'
import ProfileModal from './components/Modals/ProfileModal'
import ReturnModal from './components/Modals/ReturnModal'
import SignInUpModal from './components/Modals/SignInUpModal'
import { retrieveItems, retrieveUser } from './services/dispatchers'
import { SET_FAVS } from './store/actions/favActions'
import { SET_ITEMS } from './store/actions/itemActions'
import { SET_USER } from './store/actions/userActions'

export const App = () => {
	const dispatch = useDispatch()
	const user = useSelector((state: IRootState) => state.user)

	useEffect(() => {
		retrieveItems().then((r) => dispatch({ type: SET_ITEMS, payload: r }))
	}, [dispatch])

	useEffect(() => {
		retrieveUser().then((r) => {
			dispatch({ type: SET_USER, payload: r })
		})
	}, [dispatch])

	useEffect(() => {
		dispatch({ type: SET_FAVS, payload: JSON.parse(window.localStorage.getItem('favorite')!) || [] })
	}, [dispatch])

	return (
		<Router>
			<div id='top'></div>
			<div className='font-sans text-sm xl:text-2xl'>
				<Header user={user} />
				<Main />
				<Footer />
			</div>
			<Switch>
				<Route path={`/user`}>{user ? <ProfileModal /> : <SignInUpModal />}</Route>
				<Route path={`/item/:id`}>
					<ItemModal />
				</Route>
				<Route path={`/payment`} component={PaymentModal} />
				<Route path={`/delivery`} component={DeliveryModal} />
				<Route path={`/returnsPolicy`} component={ReturnModal} />
				<Route path={`/history`} component={HistoryModal} />
			</Switch>
		</Router>
	)
}

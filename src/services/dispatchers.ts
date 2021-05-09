import axios from 'axios'

//USER urls
const getUserUrl = '/api/user/retrieve'
const loginUrl = '/api/user/login'
const registerUrl = '/api/user/register'
const updateUserUrl = '/api/user/update'
const signOutUrl = '/api/user/signout'

//ORDER urls
const createOrderUrl = '/api/order/create'

//ITEM urls
const getItemsUrl = '/api/item'
const removeItemUrl = '/api/item/remove'
const createItemUrl = '/api/item/create'
const updateItemUrl = '/api/item/update'

//======================USERS======================

/**
 * Function for retrieving user from DB if it is logged in
 * Should be dispatched in App component
 */
export const retrieveUser = async () => {
	let user = null
	return axios.post(getUserUrl).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		user = r.data.user
		return user
	})
}

/**
 * Function for logging user in
 */
export const loginUser = async (signInObj: ILoginUserProps) => {
	let user = null
	return axios.post(loginUrl, signInObj).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		user = r.data
		return user
	})
}

/**
 * Function for registering user
 */
export const register = async (signUpObj: ILoginUserProps) => {
	let user = null
	return axios.post(registerUrl, signUpObj).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		user = r.data
		return user
	})
}

/**
 * Function for registering user
 */
export const signout = async () => {
	return axios.post(signOutUrl).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		return r.data.user
	})
}

/**
 * Function for registering user
 */
export const updateUser = async (updatesObj: IUpdateProps) => {
	let user = null
	return axios.post(updateUserUrl, updatesObj).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		user = r.data
		return user
	})
}

//======================ITEMS======================

/**
 * Function for retrieving items from DB
 * Should be dispatched in App component
 */
export const retrieveItems = () => {
	let items = null
	return axios.get(getItemsUrl).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		items = r.data
		return items
	})
}

/**
 * Function for retrieving one special item from DB
 * Should be dispatched in ItemModal component
 */
export const retrieveItem = (id: string) => {
	let item = null
	return axios.get(`${getItemsUrl}/${id}`).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		item = r.data[0]
		return item
	})
}

//======================ORDERS======================

/**
 * Function for registering user
 */
export const createOrder = async (orderObj: ICreateOrderProps) => {
	let order = null
	return axios.post(createOrderUrl, orderObj).then((r) => {
		//TODO delete console.log()
		console.log(r)
		//
		order = r.data
		return order
	})
}

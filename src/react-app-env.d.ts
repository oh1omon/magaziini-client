/// <reference types="react-scripts" />

// STORE TYPES AND INTERFACES
interface IRootState {
	user: IUserState
}

type IUserState = IUser | null

interface UserStateAction extends Action {
	type: string
	payload: IUserState
}

interface IUser {
	name: string
	_id: string
	email: string
	password: string
	orders: string
	street: string
	city: string
	country: string
}

//PROPS
interface IModalProps {
	children: HTMLElement
}

interface IHeaderProps {
	user: IUser | null
	sex: string
	setSex: function
}

interface IItemCardProps {
	id: string
	name: string
	description: string
	img: string
	price: number
	url: string
	favs: string[]
	setFavs: function
}

interface IFavButtonProps {
	id: string
	favs: string[]
	setFavs: function
}

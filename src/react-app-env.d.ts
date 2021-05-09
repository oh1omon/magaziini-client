/// <reference types="react-scripts" />

// STORE TYPES AND INTERFACES
interface IRootState {
	user: IUserState
	items: IItemsState
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

interface IITems {
	_id: string
	name: string
	description: string
	sex: string
	image: string
	sizes: string[]
	inStock: number
	price: number
	color: string
	availiableColors: string[]
	season: string
	structure: {}
}

type IItemsState = IITems[] | null

interface IItemStateAction extends Action {
	type: string
	payload: IITems[]
}

//PROPS
interface IModalProps {
	children: JSX.IntrinsicElements.div
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

interface IMainProps {
	sex: string
	favs: string[]
	setFavs: function
}

interface IItemModalProps {
	favs: string[]
	setFavs: function
}

interface ILoginUserProps {
	email?: string
	password?: string
}

interface ICreateOrderProps {
	itemId: string
	size: string
	submitter: string
}

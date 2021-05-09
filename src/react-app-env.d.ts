/// <reference types="react-scripts" />

// STORE TYPES AND INTERFACES
interface IRootState {
	user: IUserState
	items: IItemsState
	favs: IFavs
	sex: ISex
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

interface IITem {
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

type IItemsState = IITem[] | null

interface IItemStateAction extends Action {
	type: string
	payload: IITem[]
}

type IFavs = string[]

interface IFavsActions extends Action {
	type: string
	payload: IFavs
}

type ISex = string

interface ISexActions extends Action {
	type: string
	payload: ISex
}

//PROPS
interface IModalProps {
	children: JSX.IntrinsicElements.div
}

interface IHeaderProps {
	user: IUser | null
}

interface IItemCardProps {
	id: string
	name: string
	description: string
	img: string
	price: number
	url: string
}

interface IFavButtonProps {
	id: string
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

interface IUpdateProps {
	password: string
}

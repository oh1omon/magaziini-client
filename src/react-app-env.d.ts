/// <reference types="react-scripts" />

// STORE TYPES AND INTERFACES
interface IRootState {
	user: IUserState
	items: IItemsState
	favs: IFavs
	sex: ISex
}

type IUserState = IUser | null

interface IUserStateAction extends Action {
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
	type: string
}

interface IITem {
	_id: string
	name: string
	description: string
	sex: string
	image: string
	sizes: string[] | string
	price: number
	color: string
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

interface ISignUpProps extends ILoginUserProps {
	name?: string
	city?: string
	street?: string
	country?: string
}

interface ICreateOrderProps {
	itemId: string
	size: string
}

interface IUpdateProps {
	password: string
}

interface ICreateItemProps {
	name?: string
	description?: string
	sex?: string
	sizes?: string[] | string
	price?: string
	image?: string
	_id?: string
}

interface IInputProps {
	className: string
	labelClassName?: string
	type: string
	name: string
	placeholder?: string
	onChange: function
	err?: boolean
	value?: string
	id?: string
	label?: string
}

interface ISignInUpFormState {
	email?: string
	password?: string
	name?: string
	street?: string
	city?: string
	country?: string
}

interface IPasswordChangeProps {
	passInputShown: boolean
	passwordShowHandler: function
}

interface IRenderSwitchProps {
	param: string
}

interface ITextareaProps {
	name: string
	type?: string
	className: string
	err: boolean
	changeHandler: function
	label: string
	defaultValue?: string
}

interface IProfileProps {
	clickHandler: function
}

interface INewsButtonProps {
	setShowNews: function
}

interface IOrder {
	_id: string
	itemId: string
	submitter: string
	submitterName: string
	street: string
	city: string
	country: string
	size: string
	color: string
	status: string
}

interface IBackBtnProps {
	backHandler: function
}

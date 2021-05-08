import * as actionTypes from '../actions/userActions'

export const userReducer = (state: IUserState = null, action: UserStateAction): IUserState => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return action.payload
		default:
			return state
	}
}

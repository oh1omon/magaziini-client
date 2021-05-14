import * as actionTypes from '../actions/userActions'

/**
 *
 * @param {IUserState} state initial state is null
 * @param {IUserStateAction} action
 * @returns {IUserState} updated state, by default returns the same state, as it was passed into reducer
 */
export const userReducer = (state: IUserState = null, action: IUserStateAction): IUserState => {
	switch (action.type) {
		case actionTypes.SET_USER:
			return action.payload
		default:
			return state
	}
}

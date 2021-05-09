import * as actionTypes from '../actions/sexActions'

export const sexReducer = (state: ISex = '', action: ISexActions): ISex => {
	switch (action.type) {
		case actionTypes.SET_SEX:
			return action.payload
		default:
			return state
	}
}

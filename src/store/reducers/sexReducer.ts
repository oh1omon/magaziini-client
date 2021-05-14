import * as actionTypes from '../actions/sexActions'

/**
 *
 * @param {ISex} state initial state is empty string
 * @param {ISexActions} action
 * @returns {ISex} updated state, by default returns the same state, as it was passed into reducer
 */
export const sexReducer = (state: ISex = '', action: ISexActions): ISex => {
	switch (action.type) {
		case actionTypes.SET_SEX:
			return action.payload
		default:
			return state
	}
}

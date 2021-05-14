import * as actionTypes from '../actions/favActions'

/**
 *
 * @param {IFavs} state initial state is array
 * @param {IFavsActions} action
 * @returns {IFavs} updated state, by default returns the same state, as it was passed into reducer
 */
export const favReducer = (state: IFavs = [], action: IFavsActions): IFavs => {
	switch (action.type) {
		case actionTypes.SET_FAVS:
			return action.payload
		default:
			return state
	}
}

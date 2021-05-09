import * as actionTypes from '../actions/favActions'

export const favReducer = (state: IFavs = [], action: IFavsActions): IFavs => {
	switch (action.type) {
		case actionTypes.SET_FAVS:
			return action.payload
		default:
			return state
	}
}

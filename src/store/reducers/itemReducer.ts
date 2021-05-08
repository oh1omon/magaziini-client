import * as actionTypes from '../actions/itemActions'

export const itemReducer = (state: IItemsState = null, action: IItemStateAction): IItemsState => {
	switch (action.type) {
		case actionTypes.SET_ITEMS:
			return action.payload
		default:
			return state
	}
}

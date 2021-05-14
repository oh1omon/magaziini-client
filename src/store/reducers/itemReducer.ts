import * as actionTypes from '../actions/itemActions'

/**
 *
 * @param {IItemsState} state initial state is null
 * @param {IItemStateAction} action
 * @returns {IItemsState} updated state, by default returns the same state, as it was passed into reducer
 */
export const itemReducer = (state: IItemsState = null, action: IItemStateAction): IItemsState => {
	switch (action.type) {
		case actionTypes.SET_ITEMS:
			return action.payload
		default:
			return state
	}
}

import { combineReducers, createStore, Store } from 'redux'
import { itemReducer } from './reducers/itemReducer'
import { userReducer } from './reducers/userReducer'

export const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer,
})

export const store: Store<IRootState> = createStore(rootReducer)

import { combineReducers, createStore, Store } from 'redux'
import { favReducer } from './reducers/favReducer'
import { itemReducer } from './reducers/itemReducer'
import { userReducer } from './reducers/userReducer'

export const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer,
	favs: favReducer,
})

export const store: Store<IRootState> = createStore(rootReducer)

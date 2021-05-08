import { combineReducers, createStore, Store } from 'redux'
import { userReducer } from './reducers/userReducer'

export const rootReducer = combineReducers({
	user: userReducer,
})

export const store: Store<IRootState> = createStore(rootReducer)

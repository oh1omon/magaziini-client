import { combineReducers, createStore, Store } from 'redux'
import { favReducer } from './reducers/favReducer'
import { itemReducer } from './reducers/itemReducer'
import { sexReducer } from './reducers/sexReducer'
import { userReducer } from './reducers/userReducer'
import { IRootState } from '../react-app-env'

export const rootReducer = combineReducers({
	user: userReducer,
	items: itemReducer,
	favs: favReducer,
	sex: sexReducer,
})

//Default redux, without thunk, since in my opinion it is overpowering this project
export const store: Store<IRootState> = createStore(rootReducer)

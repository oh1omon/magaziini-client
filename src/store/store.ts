import { applyMiddleware, combineReducers, createStore, Store } from 'redux'
import thunk from 'redux-thunk'

export const rootReducer = combineReducers({
    def: () => {
        return {}
    },
})

export const store: Store<IRootState> = createStore(
    rootReducer,
    applyMiddleware(thunk)
)

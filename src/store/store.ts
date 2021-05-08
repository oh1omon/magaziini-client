import { combineReducers, createStore, Store } from 'redux'

export const rootReducer = combineReducers({
    def: () => {
        return {}
    },
})

export const store: Store<IRootState> = createStore(rootReducer)

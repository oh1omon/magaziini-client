import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { App } from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
import GlobalStyling from './theme/GlobalStyling'

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <GlobalStyling />
            <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)

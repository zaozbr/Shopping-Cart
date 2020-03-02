import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import cartReducer from './components/reducers/cartReducer'
import { forbiddenWordsMiddleware } from "./components/middleware"
import thunk from "redux-thunk"
 
const storeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    cartReducer,
    storeEnhancers( applyMiddleware(forbiddenWordsMiddleware, thunk) ) 
);

ReactDOM.render( <Provider store={store}><App/></Provider>, document.getElementById('root'));
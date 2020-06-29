import React from 'react';
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { createStore, compose, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import App from "./components/app/app"
import rootReducer from './redux/reducers/rootReducer'
import './index.scss'


const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware()
  )
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

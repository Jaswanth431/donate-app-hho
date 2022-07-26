import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import { Provider } from 'react-redux';
import authenticationReducer from './reducers/index';
import App from './App';
import './index.css'

const store = createStore(authenticationReducer,/* preloadedState, */
window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
<Provider store= {store}>
   <App/>
</Provider>
,  document.getElementById('root'));

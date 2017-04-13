import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import makePins from './reducers/makepins'

let store = createStore(makePins)

ReactDOM.render(
  <Provider store={store}>
    <App store={store}  />
  </Provider>,
  document.getElementById('root')
);

store.dispatch({ type: '@@init' });

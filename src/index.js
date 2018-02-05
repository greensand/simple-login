import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { reset } from 'redux-form';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import {createStore} from 'redux';
import rootReducer from './reducers';

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return {};
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {};
  }
};

let persistedState = loadState();
let store = createStore(rootReducer,persistedState);

if(!(Object.keys(persistedState).length === 0) && persistedState.hasOwnProperty('form')){
  Object.keys(persistedState.form).map((key) => {
    if(key){
      store.dispatch(reset(key));
    }
  });
}

store.subscribe(() => {
  try {
    // delete state.form;
    const serializedState = JSON.stringify(store.getState());
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
});

ReactDOM.render(<Provider  store={store}  ><App /></Provider>, document.getElementById('root'));
registerServiceWorker();

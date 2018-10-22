import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import {getFirebase, reactReduxFirebase} from 'react-redux-firebase';
import firebase from './fire';
import reducers from './store/reducers/index';
import App from './App';
import {unregister} from './serviceWorker';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const store = createStore(combineReducers({
		...reducers,
	}),
	compose(
		applyMiddleware(thunk.withExtraArgument({getFirebase})),
		reactReduxFirebase(firebase, {attachAuthIsReady: true, userProfile: 'users'})
	)
);

// Render app only if AuthIsReady
store.firebaseAuthIsReady.then(() => {
	ReactDOM.render(<Provider store={store}><App/></Provider>, document.getElementById('root'));

});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
unregister();

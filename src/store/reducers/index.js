import chatReducer from './chatReducer';
import authReducer from './authReducer';
import {firebaseReducer} from 'react-redux-firebase';
import {reducer as notifications} from 'react-notification-system-redux';

const reducers = {
	chat: chatReducer,
	auth: authReducer,
	firebase: firebaseReducer,
	notifications
};

export default reducers;
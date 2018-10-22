import {success} from 'react-notification-system-redux';

export const signIn = credentials => {
	return (dispatch, getState, {getFirebase}) => {
		getFirebase().auth().signInWithEmailAndPassword(credentials.email, credentials.password)
			.then(() => {
				dispatch({type: 'LOGIN_SUCCESS'});
				dispatch(success({
					title: 'Login successful',
					position: 'br'
				}))
			}).catch(err => {
			dispatch({type: 'LOGIN_ERROR', payload: {err}});
		})
	}
};

export const signOut = () => {
	return (dispatch, getState, {getFirebase}) => {
		getFirebase().auth().signOut().then(() => {
			dispatch({type: 'SIGN_OUT_SUCCESS '});
			dispatch(success({
				title: 'Logout successful',
				position: 'br'
			}))
		}).catch((err) => {
			dispatch({type: 'SIGN_OUT_ERROR', payload: {err}});
		})
	}
};

export const register = (credentials, ownProps) => {
	return (dispatch, getState, {getFirebase}) => {

		// Create new user
		getFirebase().auth().createUserWithEmailAndPassword(credentials.email, credentials.password).then((userCredentials) => {

			// Create user profile in the database
			const userUID = userCredentials.user.uid;
			getFirebase().database().ref('users').child(userUID).set({
				email: credentials.email,
				messages: 0,
				registrationTime: new Date().getTime()
			})
				.then(() => {
					dispatch({type: 'REGISTER_SUCCESS'});
					ownProps.history.push('/chat');
				})
		}).catch(err => {
			dispatch({type: 'REGISTER_ERROR', payload: {err}});
		})
	}
};
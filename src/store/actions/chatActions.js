export const sendMessage = message => {
	return (dispatch, getState, {getFirebase}) => {
		const database = getFirebase().database();

		// ! Need transaction for this

		// Push new message to the database
		database.ref('messages').push({...message});

		// Increase users messages counter
		const loggedUserUID = getState().firebase.auth.uid;

		database.ref(`users/${loggedUserUID}`).once('value').then(snapshot => {
			const userProfile = snapshot.val();
			database.ref(`users/${loggedUserUID}`).update({
				...userProfile,
				messages: userProfile.messages + 1
			})
		});

		// Increase global messages counter

		database.ref('chatInfo').once('value').then(snapshot => {
			const oldValues = snapshot.val();

			database.ref('chatInfo').update({
				...oldValues,
				numberOfMessages: oldValues.numberOfMessages + 1
			})
		});
	}
};

export const loadInitialMessages = () => {
	return (dispatch, getState, {getFirebase,}) => {
		const messagesRef = getFirebase().database().ref('messages');

		messagesRef.once('value').then(snapshot => {
			let messages;

			//	Check if there are some messages, if so, cut length by 1, because last message will be added by on('child_added')
			if (snapshot.val()) {
				messages = Object.values(snapshot.val());
				messages = messages.slice(0, messages.length - 1);
			} else {
				messages = [];
			}

			dispatch({type: 'SET_INITIAL_MESSAGES', payload: {messages}})
		}).then(() => {
			getFirebase().database().ref('messages').limitToLast(1).on('child_added', snapshot => {
				const message = snapshot.val();
				dispatch({type: 'ADD_NEW_MESSAGE', payload: {message}});
			})
		});
	}
};
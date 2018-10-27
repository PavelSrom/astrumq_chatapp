const initialState = {
	messages: [],
	chatIsLoading: true,
	messagesPerPage: 5,
};

const chatReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'ADD_NEW_MESSAGE':
			return {
				...state,
				messages: state.messages.concat([action.payload.message]),
			};

		case 'SET_INITIAL_MESSAGES':
			return {
				...state,
				messages: action.payload.messages,
				chatIsLoading: false,
			};

		default:
			return state;
	}
};

export default chatReducer;
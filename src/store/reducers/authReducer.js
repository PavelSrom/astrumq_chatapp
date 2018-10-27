const initialState = {
	loginError: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case 'LOGIN_SUCCESS':
			return {
				...state,
				loginError: null,
			};

		case 'LOGIN_ERROR':
			return {
				...state,
				loginError: action.payload.err.message,
			};

		case 'SIGN_OUT_SUCCESS':
			return {
				...state,
			};

		case 'SIGN_OUT_ERROR':
			return {
				...state,
			};

		case 'REGISTER_SUCCESS':
			return {
				...state,
			};

		case 'REGISTER_ERROR':
			return {
				...state,
				registrationError: action.payload.err.message,
			};

		default:
			return state;
	}
};

export default authReducer;
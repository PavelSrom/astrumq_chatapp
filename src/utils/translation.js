export const translateMessage = errorMessage => {
	const translations = {
		'The password is invalid or the user does not have a password.': 'Heslo není správné nebo uživatel nemá nastavené heslo.',
		'The email address is badly formatted.': 'Email není ve správném formátu.',
	};

	return translations[errorMessage] || errorMessage;
};
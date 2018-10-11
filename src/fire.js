import firebase from 'firebase';

const {
	REACT_APP_API_KEY: apiKey,
	REACT_APP_AUTH_DOMAIN: authDomain,
	REACT_APP_DATABASE_URL: databaseURL,
	REACT_APP_PROJECT_ID: projectId,
	REACT_APP_STORAGE_BUCKET: storageBucket,
	REACT_APP_MESSAGING_SENDER_ID: messagingSenderId
} = process.env;

const config = {
	apiKey,
	authDomain,
	databaseURL,
	projectId,
	storageBucket,
	messagingSenderId
};

const fire = firebase.initializeApp(config);

export default fire;
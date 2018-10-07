import firebase from 'firebase';

const config = {
	apiKey: "AIzaSyD0TKqnYA2ovCfkW-ZR7crIAUENLzSlQGM",
	authDomain: "astrumq-chatapp.firebaseapp.com",
	databaseURL: "https://astrumq-chatapp.firebaseio.com",
	projectId: "astrumq-chatapp",
	storageBucket: "astrumq-chatapp.appspot.com",
	messagingSenderId: "192326594300"
};
const fire = firebase.initializeApp(config);

export default fire;
import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
    apiKey: "AIzaSyA2hbPBN6_K1rAaV-GqwWMMhLQt4RCOnfA",
    authDomain: "nep-e-book.firebaseapp.com",
    projectId: "nep-e-book",
    storageBucket: "nep-e-book.appspot.com",
    messagingSenderId: "104591909246",
    appId: "1:104591909246:web:8a60ca86518cd44a6f532f",
    measurementId: "G-131L1W57VC"
}

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

const { REACT_APP_VAPID_KEY } = process.env

const publicKey = REACT_APP_VAPID_KEY;

export const getToken = async (setTokenFound) => {
    let currentToken = '';

    try {
        currentToken = await messaging.getToken({ vapidKey: publicKey });
        if (currentToken) {
            setTokenFound(true);
        } else {
            setTokenFound(false);
        }
    } catch (error) {
        console.log("an error occurred while receiving token. ", error)
    }
    return currentToken;
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        messaging.onMessage((payload) => {
            resolve(payload);
        });
    });



// export default firebase;
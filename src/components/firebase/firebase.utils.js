import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCQLGLLJxvIRM52fqKnUM5uDmyu2qhr_SM",
    authDomain: "the-community-bcf0c.firebaseapp.com",
    projectId: "the-community-bcf0c",
    storageBucket: "the-community-bcf0c.appspot.com",
    messagingSenderId: "749846846891",
    appId: "1:749846846891:web:a67aa835d596df7e4746ee"
  };

export const createUserProfileDocument = async(userAuth, additionalData) => {
  if (!userAuth) return;
  // userRef will see wether a user has been already logged in or not
  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }
  return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
// Google will output prompt and always ask user to select account
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
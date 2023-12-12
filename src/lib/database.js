import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDSAHd9MlbcCZ5aa4OI4a2MxF-TfQ7SWeA',
	authDomain: 'form-manager-944a9.firebaseapp.com',
	projectId: 'form-manager-944a9',
	storageBucket: 'form-manager-944a9.appspot.com',
	messagingSenderId: '748688896191',
	appId: '1:748688896191:web:71c103c6182b023264560a',
	measurementId: 'G-HSV96F0DTB'
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

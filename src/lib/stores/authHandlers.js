import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '$lib/firebase/firebase';
import { goto } from '$app/navigation';
import { user } from './user';
export const authHandlers = {
	async signup(email, password) {
		try {
			const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
			user.set(userCredentials.user);
			goto('/home');
		} catch (error) {
			console.error(error);
		}
	},
	async login(email, password) {
		try {
			const userCredentials = await signInWithEmailAndPassword(auth, email, password);
			user.set(userCredentials.user);
			goto('/home');
		} catch (error) {
			console.error(error);
		}
	},
	async logout() {
		try {
			await signOut(auth);
			user.set(null);
		} catch (error) {
			console.error(error);
		}
	}
};

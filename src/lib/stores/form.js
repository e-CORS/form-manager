import { db, auth } from '$lib/firebase/firebase';
import {
	getDoc,
	addDoc,
	collection,
	doc,
	updateDoc,
	query,
	getDocs,
	where,
	deleteDoc
} from 'firebase/firestore';
import { writable } from 'svelte/store';

export const currentForm = writable(null);

export const formHandler = {
	async createForm(form) {
		try {
			const user = auth.currentUser;
			if (!user.uid) throw new Error("Current user doesn't have and id");
			const docRef = await addDoc(collection(db, 'forms'), {
				formTitle: form.title,
				formFields: form.fields,
				userId: user.uid
			});
			return docRef.id;
		} catch (error) {
			console.error(error.message);
		}
	},
	async getFormsByUser() {
		try {
			const user = auth.currentUser;
			if (!user.uid) throw new Error("Current user doesn't have and id");
			const q = query(collection(db, 'forms'), where('userId', '==', user.uid));
			const querySnapshot = await getDocs(q);
			let forms = [];
			querySnapshot.forEach((doc) => {
				forms.push({ id: doc.id, ...doc.data() });
			});
			return forms;
		} catch (error) {
			console.error('Error fetching forms: ', error);
		}
	},
	async updateForm(formId, updatedData) {
		try {
			const formRef = doc(db, 'forms', formId);
			await updateDoc(formRef, updatedData);
			console.log('Form updated successfully');
		} catch (error) {
			console.error('Error updating form: ', error);
		}
	},
	async deleteForm(formId) {
		try {
			console.log('form id: ', formId);
			await deleteDoc(doc(db, 'forms', formId));
			console.log('Form deleted successfully');
		} catch (error) {
			console.error('Error deleting form: ', error);
		}
	},
	async getFormById(formId) {
		const docRef = doc(db, 'forms', formId);
		try {
			const docSnap = await getDoc(docRef);

			if (docSnap.exists()) {
				return docSnap.data();
			} else {
				console.error('No form found for that id');
				return null;
			}
		} catch (error) {
			console.error('Error getting form:', error);
			return null;
		}
	}
};

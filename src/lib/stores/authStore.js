import { writable } from 'svelte/store';

const initialState = {
	user: null,
	loading: true,
	data: {}
};

export const authStore = writable(initialState);

import { get } from 'svelte/store';
import { user } from '$lib/stores/user';
import { goto } from '$app/navigation';

export async function checkAuth() {
	const currentUser = get(user);

	if (!currentUser) {
		goto('/login');
	}
}

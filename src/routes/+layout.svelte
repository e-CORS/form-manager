<script>
	import '../app.css';
	import { get } from 'svelte/store';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import Header from '../components/Header.svelte';
	import { user } from '$lib/stores/user';
	import { authHandlers } from '$lib/stores/authHandlers';
	import { onMount } from 'svelte';
	import { auth } from '$lib/firebase/firebase';
	import { onAuthStateChanged } from 'firebase/auth';

	let loading = true;
	onMount(() => {
		onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				user.set(firebaseUser);
			} else {
				user.set(null);
			}
			loading = false;
		});
	});

	// force reactivity on current path
	$: currentPath = $page.url.pathname;

	const handleLoginLogout = async () => {
		try {
			const currentUser = get(user);
			if (currentUser) {
				await authHandlers.logout();
				user.set(null);
				return goto('/login');
			}
		} catch (error) {
			console.error(error.message);
		}
	};

	const goHome = () => {
		const currentUser = get(user);
		if (currentUser) {
			return goto('/home');
		}
		goto('/');
	};
</script>

{#if loading}
	<div class="w-full h-full bg-gray-900 flex justify-center items-center text-gray-300 text-xl">
		Loading ...
	</div>
{:else}
	<Header>
		<button class="text-xl font-bold tracking-tight text-white" on:click={goHome}>
			Form Manager
		</button>
		{#if currentPath !== '/' && currentPath !== '/login'}
			<button class="text-xs font-normal text-white" on:click={handleLoginLogout}> Logout </button>
		{/if}
	</Header>
	<slot />
{/if}

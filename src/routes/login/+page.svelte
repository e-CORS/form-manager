<script>
	import { onMount } from 'svelte';
	import Authentication from '../../components/Authentication.svelte';
	import { user } from '$lib/stores/user';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	onMount(() => {
		const currentUser = get(user);
		if (currentUser) {
			goto('/home');
		}
	});
</script>

<Authentication />

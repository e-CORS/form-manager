<script>
	import { onMount } from 'svelte';
	import { checkAuth } from '$lib/routeGuard';

	onMount(() => {
		checkAuth();
	});
</script>

<div class="w-full h-full bg-red-50"></div>

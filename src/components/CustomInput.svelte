<script>
	import { onMount } from 'svelte';
	export let type = 'text';
	export let label;
	export let value = '';

	let inputElement;
	onMount(() => {
		inputElement.type = type;
	});
</script>

<div>
	<label for="email" class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
	<div class="mt-2">
		<input
			id={type}
			bind:value
			bind:this={inputElement}
			class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
		/>
	</div>
</div>

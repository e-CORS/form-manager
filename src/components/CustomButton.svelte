<script>
	export let buttonText = 'Button text';
	export let loading = false;
	export let buttonCta = () => {
		console.log('this is the button Cta');
	};
	export let customClass = '';
</script>

<button
	{loading}
	on:click={buttonCta}
	class="bg-indigo-500 hover:bg-indigo-900 py-2 px-6 w-max h-max rounded-lg text-white font-semi text-sm {customClass}"
>
	{#if !loading}
		{buttonText}
	{:else}
		<img src="/img/loading.webp" alt="loading.." class="h-4 w-4 brightness-200" />
	{/if}
</button>

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
	class="{customClass} bg-indigo-800 p-2 w-max h-max rounded-lg text-white font-semi text-sm'"
>
	{buttonText}
</button>

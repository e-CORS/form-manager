<script>
	export let buttonText = 'Button text';
	export let buttonCta = () => {
		console.log('this is the button Cta');
	};
	export let customClass = '';
</script>

<button
	on:click={buttonCta}
	class="{customClass} bg-indigo-800 p-2 w-max h-max rounded-lg text-white font-semi text-sm'"
>
	{buttonText}
</button>

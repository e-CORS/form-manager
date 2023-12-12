<script>
	import { goto } from '$app/navigation';
	import CustomButton from '../components/CustomButton.svelte';
	const handleStart = () => {
		goto('/home');
	};
</script>

<div class="h-full w-screen p-10">
	<div class="h-full w-full shadow-md border-black flex flex-col justify-center items-center">
		<h1 class="text-2xl text-gray-900">Welcome to Font Manager</h1>
		<span class="text-sm text-gray-700 text-center mt-2">
			A website that allows you to generate your own forms and use them everywhere!</span
		>
		<CustomButton buttonText="Get started" buttonCta={handleStart} customClass="mt-3" />
	</div>
</div>

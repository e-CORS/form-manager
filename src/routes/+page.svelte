<script>
	import { goto } from '$app/navigation';
	import CustomButton from '../components/CustomButton.svelte';
	const handleStart = () => {
		goto('/home');
	};
</script>

<div class="h-full w-screen p-10 bg-indigo-900">
	<div
		class="h-full w-full shadow-lg border-white border-2 rounded-lg flex justify-between p-10 bg-indigo-800"
	>
		<div class="h-full flex flex-col justify-center items-start">
			<h1 class="text-3xl text-white">Welcome to Font Manager</h1>
			<span class="text-md text-gray-300 text-left mt-2">
				A website that allows you to generate your own forms and use them everywhere!
			</span>
			<span class="text-md text-gray-300 text-left mt-2"
				>Elevate your buiseness to the next level</span
			>
			<CustomButton buttonText="Get started" buttonCta={handleStart} customClass="mt-3" />
		</div>
		<img src="/img/landing-form.svg" alt="example form" class="w-1/2 hidden md:block" />
	</div>
</div>

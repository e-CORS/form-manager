<script>
	import CustomInput from '../components/CustomInput.svelte';
	import { createEventDispatcher } from 'svelte';
	import CustomButton from '../components/CustomButton.svelte';

	const dispatch = createEventDispatcher();
	const closeModal = () => {
		dispatch('closeModal');
	};
	const createForm = () => {};

	export let promptText = '';
</script>

<div
	class="w-screen h-screen backdrop-blur-md absolute z-10 top-0 flex justify-center items-center"
>
	<div class=" p-20 rounded-lg shadow-md border-black relative bg-white">
		<button on:click={closeModal} class="absolute top-4 right-10"
			><img src="/img/delete-icon.svg" alt="delete" class="w-6 h-6" /></button
		>
		<h2 class="text-center font-bold mb-4">Create with AI</h2>
		<p class="text-center font-normal text-gray-500">
			Describe what you want your form to get you!
		</p>
		<CustomInput type="text" bind:value={promptText} label="" />
		<CustomButton buttonText="Generate" buttonCta={createForm} />
	</div>
</div>

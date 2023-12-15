<script>
	import CustomInput from '../components/CustomInput.svelte';
	import { goto } from '$app/navigation';
	import { createEventDispatcher } from 'svelte';
	import CustomButton from '../components/CustomButton.svelte';
	import { formHandler } from '$lib/stores/form';

	const dispatch = createEventDispatcher();
	const closeModal = () => {
		dispatch('closeModal');
	};

	let sending = false;
	const createForm = async () => {
		sending = true;
		const form = await fetch('/api/form-with-ai', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ promptText })
		})
			.then((res) => res.json())
			.catch((error) => console.error('Error:', error))
			.then((response) => JSON.parse(response.form));
		const createdFormId = await formHandler.createForm(form);
		closeModal();
		goto(`/form?formId=${createdFormId}`);
	};

	export let promptText = '';
</script>

<div
	class="w-screen h-screen backdrop-blur-lg absolute z-10 top-0 flex justify-center items-center"
>
	<div class="grid p-20 rounded-lg shadow-2xl shadow-indigo-400 border-black relative bg-white">
		<button on:click={closeModal} class="absolute top-4 right-10"
			><img src="/img/delete-icon.svg" alt="delete" class="w-6 h-6" /></button
		>
		<h2 class="text-center font-bold mb-4">Create with AI</h2>
		<p class="text-center font-normal text-gray-500">
			Describe what you want your form to get you!
		</p>
		<CustomInput type="text" bind:value={promptText} label="" />
		<CustomButton
			buttonText="Generate"
			buttonCta={createForm}
			loading={sending}
			customClass="mt-3 justify-self-center"
		/>
	</div>
</div>

<script>
	import { currentForm, formHandler, setCurrentForm } from '$lib/stores/form';
	import CustomInput from './CustomInput.svelte';
	import { goto } from '$app/navigation';

	export let formId;
	let loading = true;
	let form = {};
	currentForm.subscribe((value) => {
		form = value;
	});
	if (!form) {
		formHandler.getFormById(formId).then((formData) => {
			if (formData) {
				loading = false;
				form = formData;
				setCurrentForm(form);
			} else {
				goto('/home');
			}
		});
	} else {
		loading = false;
	}

	const handleUpdate = () => {
		goto(`/form/update/?formId=${formId}`);
	};
	const handleDelete = () => {
		formHandler.deleteForm(formId);
		goto('/home');
	};
</script>

<div class="w-full h-full border-black shadow-md rounded-md justify-center relative">
	{#if loading}
		<div class="w-full h-full flex justify-center items-center text-gray-300 text-xl">
			Loading ...
		</div>
	{:else}
		<div class="absolute right-10 top-2 flex gap-x-1">
			<button on:click={handleUpdate}
				><img src="/img/update-icon.svg" alt="view form" class="w-4 h-4" /></button
			>
			<button on:click={handleDelete}
				><img src="/img/delete-icon.svg" alt="view form" class="w-4 h-4" /></button
			>
		</div>
		<h2 class="text-center mt-4">{form?.formTitle}</h2>
		{#if form?.formFields}
			<div class="flex flex-col gap-y-3 px-8 mt-3">
				{#each form.formFields as field}
					<CustomInput
						label={field.label}
						type={field.type}
						placeholder={field.placeholder}
						required={field.required}
						options={field.options}
					/>
				{/each}
			</div>
		{/if}
	{/if}
</div>

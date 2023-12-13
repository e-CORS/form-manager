<script>
	import { currentForm, formHandler } from '$lib/stores/form';
	import { get } from 'svelte/store';
	import CustomInput from '../../../components/CustomInput.svelte';
	import CustomButton from '../../../components/CustomButton.svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';

	const formId = $page.data.formId;
	let loading = true;
	let form = get(currentForm);
	if (!form) {
		formHandler.getFormById(formId).then((formData) => {
			if (formData) {
				loading = false;
				form = formData;
				currentForm.set(form);
			} else {
				goto('/home');
			}
		});
	} else {
		loading = false;
	}

	const handleView = () => {
		console.log('view form', formId);
		goto(`/form?formId=${formId}`);
	};

	const handleDelete = () => {
		console.log('delete form', formId);
		formHandler.deleteForm(formId);
		goto('/home');
	};

	let changesCounter = 0;
	const handleDeleteField = (event) => {
		changesCounter += 1;
		const { fieldIndex, type, optionIndex } = event.detail;
		if (type === 'field') {
			form.formFields.splice(fieldIndex, 1);
		} else if (type === 'option') {
			form.formFields[fieldIndex].options.splice(optionIndex, 1);
			if (!form.formFields[fieldIndex].options.length > 0) {
				form.formFields.splice(fieldIndex, 1);
			}
		}
		// trigger reactivity by reasigning the object to itself since svelte lacks nested reactivity
		form = form;
	};

	let newFormTitle = '';

	const handleSaveChanges = async () => {
		if (newFormTitle !== '') {
			form.formTitle = newFormTitle;
			// trigger reactivity by reasigning the object to itself since svelte lacks nested reactivity
			form = form;
		}
		await formHandler.updateForm(formId, form);
	};
</script>

<div class="w-full h-full border-black shadow-md rounded-md justify-center relative">
	{#if loading}
		<div class="w-full h-full flex justify-center items-center text-gray-300 text-xl">
			Loading ...
		</div>
	{:else}
		<div class="absolute right-10 -top-8 flex gap-x-1">
			<button on:click={handleView}
				><img src="/img/view-icon.svg" alt="view form" class="w-4 h-4" /></button
			>
			<button on:click={handleDelete}
				><img src="/img/delete-icon.svg" alt="view form" class="w-4 h-4" /></button
			>
		</div>
		<div class="px-8 mt-10 mr-7">
			<CustomInput
				type="text"
				bind:value={newFormTitle}
				placeholder={form?.formTitle}
				label="Form title"
			/>
		</div>
		{#if form?.formFields}
			<div class="flex flex-col gap-y-3 mt-3 px-8">
				{#each form.formFields as field, index}
					<CustomInput
						{index}
						label={field.label}
						type={field.type}
						placeholder={field.placeholder}
						required={field.required}
						options={field.options}
						deletable={true}
						on:deleteField={handleDeleteField}
					/>
				{/each}
			</div>
		{/if}
		{#if changesCounter > 0 || newFormTitle !== ''}
			<CustomButton
				buttonText="Save Changes"
				buttonCta={handleSaveChanges}
				customClass="mt-4 ml-8"
			/>
		{/if}
	{/if}
</div>

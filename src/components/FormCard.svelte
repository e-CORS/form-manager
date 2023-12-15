<script>
	import { formHandler, setCurrentForm } from '$lib/stores/form';
	import { createEventDispatcher } from 'svelte';
	import { goto } from '$app/navigation';

	export let form;

	const dispatch = createEventDispatcher();
	const handleView = () => {
		setCurrentForm(form);
		console.log('view form', form.id);
		dispatch('updateForms');
		goto(`/form?formId=${form.id}`);
	};
	const handleUpdate = () => {
		console.log('update form', form.id);
		dispatch('updateForms');
	};
	const handleDelete = async () => {
		console.log('delete form', form.id);
		await formHandler.deleteForm(form.id);
		dispatch('updateForms');
	};
</script>

<div
	class="w-fit h-24 rounded-lg border-black shadow-lg p-5 bg-gray-100 flex flex-col justify-start items-start relative"
>
	<div class="absolute left-2 top-2 flex gap-x-1">
		<button on:click={handleView}
			><img src="/img/view-icon.svg" alt="view form" class="w-3 h-3" /></button
		>
		<button on:click={handleUpdate}
			><img src="/img/update-icon.svg" alt="view form" class="w-3 h-3" /></button
		>
		<button on:click={handleDelete}
			><img src="/img/delete-icon.svg" alt="view form" class="w-3 h-3" /></button
		>
	</div>
	<h2 class="font-semi text-ellipsis">{form.formTitle}</h2>
	<p class="mt-3 font-normal text-xs">Field count: {form.formFields.length}</p>
</div>

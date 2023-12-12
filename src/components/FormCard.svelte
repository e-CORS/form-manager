<script>
	import { formHandler } from '$lib/stores/form';
	import { createEventDispatcher } from 'svelte';

	export let form;

	const dispatch = createEventDispatcher();
	const handleView = () => {
		console.log('view form', form.id);
		dispatch('updateForms');
	};
	const handleUpdate = () => {
		console.log('update form', form.id);
		dispatch('updateForms');
	};
	const handleDelete = () => {
		console.log('delete form', form.id);
		formHandler.deleteForm(form.id);
		dispatch('updateForms');
	};
</script>

<div
	class="w-40 h-24 rounded-lg border-black shadow-lg p-5 bg-gray-100 flex flex-col justify-start items-start relative"
>
	<div class="absolute left-2 top-2 flex gap-x-1">
		<button on:click={handleView}
			><img src="/img/view-icon.svg" alt="view form" class="w-2 h-2" /></button
		>
		<button on:click={handleUpdate}
			><img src="/img/update-icon.svg" alt="view form" class="w-2 h-2" /></button
		>
		<button on:click={handleDelete}
			><img src="/img/delete-icon.svg" alt="view form" class="w-2 h-2" /></button
		>
	</div>
	<h2 class="font-semi text-ellipsis">{form.formTitle}</h2>
	<p class="mt-3 font-normal text-xs">Field count: {form.formFields.length}</p>
</div>

<script>
	import CustomButton from '../../components/CustomButton.svelte';
	import { onMount } from 'svelte';
	import { checkAuth } from '$lib/routeGuard';
	import { formHandler } from '$lib/stores/form';
	import FormCard from '../../components/FormCard.svelte';
	import { goto } from '$app/navigation';

	let forms = [];
	onMount(async () => {
		checkAuth();
		forms = await formHandler.getFormsByUser();
	});

	const handleCreateForm = async () => {
		goto('/form/create');
		// const form = {
		// 	title: `testing...${forms.length}`,
		// 	fields: [
		// 		{
		// 			id: 'field_1',
		// 			label: 'Text Input',
		// 			type: 'text',
		// 			placeholder: 'Enter text here',
		// 			required: true
		// 		},
		// 		{
		// 			id: 'field_2',
		// 			label: 'Number Input',
		// 			type: 'number',
		// 			placeholder: 'Enter a number',
		// 			required: false
		// 		},
		// 		{
		// 			id: 'field_3',
		// 			label: 'Checkbox',
		// 			type: 'checkbox',
		// 			options: [
		// 				{ label: 'Option 1', value: 'option_1' },
		// 				{ label: 'Option 2', value: 'option_2' }
		// 			],
		// 			required: true
		// 		},
		// 		{
		// 			id: 'field_4',
		// 			label: 'Dropdown',
		// 			type: 'select',
		// 			options: [
		// 				{ label: 'Option 1', value: 'option_1' },
		// 				{ label: 'Option 2', value: 'option_2' }
		// 			],
		// 			required: false
		// 		}
		// 	]
		// };
		// await formHandler.createForm(form);

		// await updateForms();
	};
	const updateForms = async () => {
		forms = await formHandler.getFormsByUser();
	};
</script>

<div class="w-full h-full bg-white flex flex-col p-4">
	<CustomButton buttonText="Create form" buttonCta={handleCreateForm} />
	<div class="w-full h-full flex gap-5 flex-wrap mt-4 justify-center">
		{#each forms as form}
			<FormCard {form} on:updateForms={updateForms} />
		{/each}
	</div>
</div>

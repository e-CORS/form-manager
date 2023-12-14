<script>
	import { formHandler, setCurrentForm } from '$lib/stores/form';
	import CustomButton from '../../../components/CustomButton.svelte';
	import CustomInput from '../../../components/CustomInput.svelte';
	import FormViewer from '../../../components/FormViewer.svelte';
	import { goto } from '$app/navigation';

	let form = {
		formTitle: 'Title',
		formFields: []
	};
	const inputTypeOptions = [
		{ value: 'text', label: 'Make field text' },
		{ value: 'number', label: 'Make field number' },
		{ value: 'checkbox', label: 'Make field checkbox' },
		{ value: 'select', label: 'Make field a dropdown' }
	];
	let selectedInputInfo = {
		label: '',
		required: false,
		type: 'text'
	};
	const handleAddInputToForm = async () => {
		if (selectedInputInfo.type === 'select') {
			selectedInputInfo.options = dropdownOptions;
		}
		form.formFields.push({
			...selectedInputInfo,
			id: `id_form_${selectedInputInfo.type}_${form.formFields.length}`,
			placeholder: selectedInputInfo.label,
			value: ''
		});
		setCurrentForm(form);
		selectedInputInfo = {
			label: '',
			required: false,
			type: 'text'
		};
	};

	const dropdownOptions = [];
	let dropdownOptionText = '';

	const handleAddDropdownOption = () => {
		dropdownOptions.push({ value: `option${dropdownOptions.length}`, label: dropdownOptionText });
		dropdownOptionText = '';
	};

	const handleCreateForm = async () => {
		const formId = await formHandler.createForm(form);
		setCurrentForm(form);
		goto(`/form?formId=${formId}`);
	};
</script>

<div class="w-full h-full px-8 py-4 flex flex-col gap-y-4">
	<CustomInput
		type="text"
		label="Form title"
		placeholder="This is my form title"
		bind:value={form.formTitle}
	/>
	<CustomInput
		type="text"
		label="Input Label"
		placeholder="This is my Input label"
		bind:value={selectedInputInfo.label}
	/>
	<CustomInput
		type="select"
		options={inputTypeOptions}
		label="Select input type to add"
		bind:value={selectedInputInfo.type}
	/>
	{#if selectedInputInfo.type === 'select'}
		<CustomInput type="text" label="Set option text" bind:value={dropdownOptionText} />
		<CustomButton
			buttonText="Add dropdown option"
			buttonCta={handleAddDropdownOption}
			customClass="mt-4"
		/>
	{/if}
	<CustomInput
		type="checkbox"
		label="Make field required?"
		bind:value={selectedInputInfo.required}
	/>
	{#if Object.keys(selectedInputInfo).length > 0 > 0}
		<CustomButton
			buttonText="Add input to form"
			buttonCta={handleAddInputToForm}
			customClass="mt-4"
		/>
		<CustomButton buttonText="Create form" buttonCta={handleCreateForm} customClass="mt-4" />
	{/if}
	{#if form.formFields.length > 0}
		<FormViewer />
	{/if}
</div>

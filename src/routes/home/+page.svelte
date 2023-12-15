<script>
	import { onMount } from 'svelte';
	import { checkAuth } from '$lib/routeGuard';
	import { formHandler } from '$lib/stores/form';
	import { goto } from '$app/navigation';
	import CustomButton from '../../components/CustomButton.svelte';
	import FormCard from '../../components/FormCard.svelte';
	import CreateFormWithAI from '../../components/CreateFormWithAI.svelte';

	let forms = [];
	let loading = true;
	onMount(async () => {
		await checkAuth();
		forms = await formHandler.getFormsByUser();
		loading = false;
	});

	const handleCreateForm = async () => {
		goto('/form/create');
	};

	let showCreateWithAI = false;
	const handleCreateWithAi = async () => {
		showCreateWithAI = !showCreateWithAI;
	};
	const updateForms = async () => {
		forms = await formHandler.getFormsByUser();
	};
</script>

<div class="w-full h-full bg-white">
	{#if loading}
		<div class="h-full flex justify-center items-center text-gray-300 text-xl">Loading ...</div>
	{:else}
		<div class="h-full w-full bg-white flex flex-col p-4">
			<div class="flex justify-end gap-3">
				<CustomButton buttonText="Create form" buttonCta={handleCreateForm} />
				<CustomButton buttonText="Create with AI" buttonCta={handleCreateWithAi} />
			</div>
			<div class="w-full flex gap-5 flex-wrap mt-20 justify-center">
				{#each forms as form}
					<FormCard {form} on:updateForms={updateForms} />
				{/each}
			</div>
		</div>
	{/if}
</div>
{#if showCreateWithAI}
	<CreateFormWithAI on:closeModal={handleCreateWithAi} />
{/if}

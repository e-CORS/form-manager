<script>
	import { onMount } from 'svelte';
	import { createEventDispatcher } from 'svelte';

	export let index;
	export let type = 'text';
	export let label;
	export let value = '';
	export let id = type;
	export let placeholder = '';
	export let required = false;
	export let options = null;
	export let deletable = false;

	let inputElement;
	const dispatch = createEventDispatcher();
	onMount(() => {
		if (type !== 'select') inputElement.type = type;
	});

	const handleDelete = (type, optionIndex = 0) => {
		dispatch('deleteField', { fieldIndex: index, type, optionIndex });
	};
</script>

<div>
	<label for="email" class="block text-sm font-medium leading-6 text-gray-900">{label}</label>
	<div class="mt-2 flex gap-x-3">
		{#if type !== 'select'}
			<input
				{id}
				bind:value
				bind:this={inputElement}
				{placeholder}
				{required}
				class:w-full={!['checkbox', 'radio'].includes(type)}
				class:w-fit={['checkbox', 'radio'].includes(type)}
				class="block rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
			/>
			{#if deletable}
				<button
					on:click={() => {
						handleDelete('field');
					}}
				>
					<img src="/img/delete-icon.svg" alt="view form" class="w-4 h-4" />
				</button>
			{/if}
		{:else if options.length > 0}
			<select
				class="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
				bind:value
			>
				{#each options as option, optionIndex}
					<option value={option.value}>{option.label}</option>
					{#if deletable}
						<button
							on:click={() => {
								handleDelete('option', optionIndex);
							}}
						>
							<img src="/img/delete-icon.svg" alt="view form" class="w-4 h-4" />
						</button>
					{/if}
				{/each}
			</select>
			{#if deletable}
				<button
					on:click={() => {
						handleDelete('field');
					}}
				>
					<img src="/img/delete-icon.svg" alt="view form" class="w-4 h-4" />
				</button>
			{/if}
		{/if}
	</div>
</div>

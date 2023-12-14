<script>
	import { authHandlers } from '$lib/stores/authHandlers';
	import CustomInput from './CustomInput.svelte';
	let email = '';
	let password = '';
	let confirmPassword = '';
	let register = false;
	let error = false;
	let authenticating = false;
	const handleSubmit = async () => {
		authenticating = true;
		if (!email || !password || (register && !confirmPassword)) {
			error = true;
			authenticating = false;
			return;
		}

		try {
			if (!register) {
				await authHandlers.login(email, password);
			} else {
				if (password === confirmPassword) await authHandlers.signup(email, password);
				else error = true;
			}
		} catch (errorMessage) {
			error = true;
			console.log('There was an auth error', errorMessage);
		}
		authenticating = false;
	};
</script>

<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
	<div class="sm:mx-auto sm:w-full sm:max-w-sm">
		<img
			class="mx-auto h-10 w-auto"
			src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
			alt="Your Company"
		/>
		<h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
			{#if register}
				Sign in to your account
			{:else}
				Create your account
			{/if}
		</h2>

		{#if error}
			<h4 class="mt-10 text-center text-red-700">The information provided is not correct</h4>
		{/if}
	</div>

	<div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
		<form class="space-y-6">
			<CustomInput type={'email'} label={'Email Address'} bind:value={email} />
			<CustomInput type={'password'} label={'Password'} bind:value={password} />
			{#if register}
				<CustomInput type={'password'} label={'Confirm Password'} bind:value={confirmPassword} />
			{/if}
			<div>
				<button
					type="submit"
					loading={authenticating}
					class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					on:click={handleSubmit}
				>
					{#if !register}
						Sign in
					{:else}
						Sign up
					{/if}</button
				>
			</div>
		</form>

		<p class="mt-10 text-center text-sm text-gray-500">
			{#if !register}
				Don't have an account?
			{:else}
				Already have an account?
			{/if}
			<button
				on:click={() => (register = !register)}
				class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
			>
				{#if !register}
					Sign up!
				{:else}
					Sign in!
				{/if}
			</button>
		</p>
	</div>
</div>

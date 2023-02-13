<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="POST">
	{#if form?.error}
		<p>Error Message: {form?.message}</p>
		<p>Invalid Field: {form?.invalidField}</p>
	{/if}

	<h2>Register</h2>

	<label for="name">Name</label>
	<input type="text" id="name" name="name" required />

	<label for="email">Email</label>
	<input type="text" id="email" name="email" required />

	<label for="password">Password</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">Register</button>
</form>

<p>Already have an account? <a href="/auth/login">Login</a></p>

<script lang="ts">
	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<form method="POST">
	{#if form?.error}
		<p>{form?.message}</p>
	{/if}

	<h2>Login</h2>
	<h3>Welcome back!</h3>

	<label for="email">Email</label>
	<input type="email" id="email" name="email" required />

	<label for="password">Password</label>
	<input type="password" id="password" name="password" required />

	<button type="submit">Login</button>
</form>

<p>Don't have an account? <a href="/auth/register">Register</a></p>

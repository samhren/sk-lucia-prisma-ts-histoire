<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>

{#if data.user}
	<p>Welcome back, {data.user.name}</p>
	<form action="/auth/logout" method="POST">
		<button type="submit">Log out</button>
	</form>
{:else}
	<p><a href="/auth/login">Log in</a></p>
{/if}

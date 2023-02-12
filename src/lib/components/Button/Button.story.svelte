<script lang="ts">
	import type { Hst } from '@histoire/plugin-svelte';

	import Button from './Button.svelte';

	let label = 'Button';
	let disabled = false;

	export let Hst: Hst;
</script>

<Hst.Story title="Button">
	<Hst.Variant>
		<Button {disabled}>
			{label}
		</Button>

		<svelte:fragment slot="controls">
			Label: <input type="text" bind:value={label} class="text-black" />
			Disabled: <input type="checkbox" bind:checked={disabled} class="text-black" />
		</svelte:fragment>
	</Hst.Variant>
</Hst.Story>

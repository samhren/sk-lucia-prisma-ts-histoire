<script lang="ts">
	export let disabled: boolean = false;
</script>

<button {disabled}>
	<slot />
</button>

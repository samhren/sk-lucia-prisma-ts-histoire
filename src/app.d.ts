// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			validate: import('@lucia-auth/sveltekit').Validate;
			validateUser: import('@lucia-auth/sveltekit').ValidateUser;
			setSession: import('@lucia-auth/sveltekit').SetSession;
		}
		// interface PageData {}
		// interface Platform {}
	}

	declare namespace Lucia {
		type Auth = import('@lucia-auth/sveltekit').Auth;
		type UserAttributes = import('@lucia-auth/sveltekit').UserAttributes;
	}
}

export {};

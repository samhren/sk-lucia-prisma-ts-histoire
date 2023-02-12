import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { auth } from '$lib/server/lucia';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();
	if (session) throw redirect(302, '/');
};

export const actions: Actions = {
	default: async ({ request, locals }) => {
		const { email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		try {
			const key = await auth.validateKeyPassword('email', email, password);

			const session = await auth.createSession(key.userId);

			locals.setSession(session);
		} catch (err) {
			return fail(400, {
				message: 'Invalid credentials.',
				error: true
			});
		}

		throw redirect(302, '/');
	}
};

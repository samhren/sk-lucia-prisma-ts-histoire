import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { z } from 'zod';
import { auth } from '$lib/server/lucia';
import { LuciaError } from 'lucia-auth';

export const load: PageServerLoad = async ({ locals }) => {
	const session = await locals.validate();

	if (session) {
		throw redirect(302, '/');
	}
};

export const actions: Actions = {
	default: async ({ request }) => {
		const { name, email, password } = Object.fromEntries(await request.formData()) as Record<
			string,
			string
		>;

		const schema = z.object({
			name: z.string().min(3).max(255),
			email: z.string().email().max(255),
			password: z.string().min(6).max(255)
		});

		// Validate the data
		try {
			schema.parse({
				name,
				email,
				password
			});
		} catch (err) {
			let message = 'Invalid data.';

			if (err instanceof z.ZodError) {
				message = err.errors[0].message;
			}

			return fail(400, {
				message,
				error: true
			});
		}

		// Create the user
		try {
			await auth.createUser({
				key: {
					providerId: 'email',
					providerUserId: email,
					password: password
				},
				attributes: {
					name,
					email
				}
			});
		} catch (err) {
			if (err instanceof LuciaError) {
				if (err.message === 'AUTH_DUPLICATE_KEY_ID') {
					return fail(400, {
						message: 'Email already in use.',
						error: true
					});
				}
			}
			return fail(400, {
				message: 'An error occurred while creating your account.',
				error: true
			});
		}
		throw redirect(302, '/login');
	}
};

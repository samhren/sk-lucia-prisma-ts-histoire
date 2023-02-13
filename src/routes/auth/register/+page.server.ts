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
			name: z
				.string({
					required_error: 'Name is required.'
				})
				.min(3, {
					message: 'Name must be at least 3 characters long.'
				})
				.max(255, {
					message: 'Name must be less than 255 characters long.'
				}),
			email: z
				.string({
					required_error: 'Email is required.'
				})
				.email({
					message: 'Email is invalid.'
				})
				.max(255, {
					message: 'Email must be less than 255 characters long.'
				}),
			password: z
				.string({
					required_error: 'Password is required.'
				})
				.min(6, {
					message: 'Password must be at least 6 characters long.'
				})
				.max(255, {
					message: 'Password must be less than 255 characters long.'
				})
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
			let invalidField: string | number = '';

			if (err instanceof z.ZodError) {
				message = err.errors[0].message;
				invalidField = err.errors[0].path[0];
			}

			return fail(400, {
				message,
				invalidField,
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
						invalidField: 'email',
						error: true
					});
				}
			}
			return fail(400, {
				message: 'An error occurred while creating your account.',
				invalidField: '',
				error: true
			});
		}
		throw redirect(302, '/login');
	}
};

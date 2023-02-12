import lucia from 'lucia-auth';
import prismaAdapter from '@lucia-auth/adapter-prisma';
import { dev } from '$app/environment';
import { prisma } from '$lib/server/prisma';

export const auth = lucia({
	adapter: prismaAdapter(prisma),
	env: dev ? 'DEV' : 'PROD',
	transformUserData: (user) => {
		return {
			id: user.id,
			name: user.name,
			email: user.email,
			username: user.username
		};
	}
});

export type Auth = typeof auth;

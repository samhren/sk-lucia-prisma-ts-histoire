import { PrismaClient } from '@prisma/client';
import { env } from '$env/dynamic/private';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (env.NODE_ENV === 'development') {
	globalForPrisma.prisma = prisma;
}

export { prisma };

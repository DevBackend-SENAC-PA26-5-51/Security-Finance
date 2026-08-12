import 'dotenv/config';

import { PrismaClient } from '../../generated/prisma/client.js';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const rawDatabaseUrl = process.env.DATABASE_URL;
const databaseUrl = (rawDatabaseUrl ?? '').trim();

const adapter = new PrismaMariaDb(databaseUrl, {
  // Additional options can be provided here if needed
});

export const prismaClientOptions = { adapter };

export function createPrismaClient(): PrismaClient {
  return new PrismaClient(prismaClientOptions);
}

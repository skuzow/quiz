import type { PrismaClient } from '@prisma/client';

import { setupTursoDatabase } from '@/../prisma/setup';

const { turso } = useRuntimeConfig();

const prisma: PrismaClient = setupTursoDatabase(
  turso.databaseUrl,
  turso.authToken
);

export default prisma;

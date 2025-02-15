import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const { NODE_ENV, TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

export const setupDatabase = (): PrismaClient => {
  if (NODE_ENV === 'production') return setupTursoDatabase();

  return setupLocalDatabase();
};

const setupTursoDatabase = (): PrismaClient => {
  const libsql = createClient({
    url: TURSO_DATABASE_URL as string,
    authToken: TURSO_AUTH_TOKEN as string
  });

  const adapter = new PrismaLibSQL(libsql);
  const prisma = new PrismaClient({ adapter });

  return prisma;
};

const setupLocalDatabase = (): PrismaClient => {
  const prisma = new PrismaClient();

  return prisma;
};

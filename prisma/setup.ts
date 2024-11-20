import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const { TURSO_DATABASE_URL, TURSO_AUTH_TOKEN } = process.env;

export const setupTursoDatabase = (): PrismaClient => {
  const libsql = createClient({
    url: TURSO_DATABASE_URL as string,
    authToken: TURSO_AUTH_TOKEN as string
  });

  const adapter = new PrismaLibSQL(libsql);
  const prisma = new PrismaClient({ adapter });

  return prisma;
};

import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

export const setupTursoDatabase = (
  tursoDatabaseURL: string,
  tursoAuthToken: string
): PrismaClient => {
  const libsql = createClient({
    url: tursoDatabaseURL,
    authToken: tursoAuthToken
  });

  const adapter = new PrismaLibSQL(libsql);
  const prisma = new PrismaClient({ adapter });

  return prisma;
};

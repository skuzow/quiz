import { PrismaClient } from '@prisma/client';
import { PrismaLibSQL } from '@prisma/adapter-libsql';
import { createClient } from '@libsql/client';

const { turso } = useRuntimeConfig();

const libsql = createClient({
  url: turso.databaseUrl,
  authToken: turso.authToken
});

const adapter = new PrismaLibSQL(libsql);
const prisma = new PrismaClient({ adapter });

export default prisma;

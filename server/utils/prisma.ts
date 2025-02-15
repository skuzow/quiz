import type { PrismaClient } from '@prisma/client';

import { setupDatabase } from '../../prisma/setup';

const prisma: PrismaClient = setupDatabase();

export default prisma;

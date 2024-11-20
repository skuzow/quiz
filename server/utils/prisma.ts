import type { PrismaClient } from '@prisma/client';

import { setupTursoDatabase } from '../../prisma/setup';

const prisma: PrismaClient = setupTursoDatabase();

export default prisma;

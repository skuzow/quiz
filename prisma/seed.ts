import * as bcrypt from 'bcrypt';
import type { PrismaClient, Role } from '@prisma/client';

import { setupTursoDatabase } from './setup';

import { ROLE, TEST_CATEGORY, TEST_QUESTION_TYPE } from '@/constants/seed';

const {
  NUXT_TURSO_DATABASE_URL,
  NUXT_TURSO_AUTH_TOKEN,

  ADMIN_EMAIL,
  ADMIN_USERNAME,
  ADMIN_PASSWORD
} = process.env;

const prisma: PrismaClient = setupTursoDatabase(
  NUXT_TURSO_DATABASE_URL!,
  NUXT_TURSO_AUTH_TOKEN!
);

const seedRoles = async () => {
  const ROLES: string[] = Object.values(ROLE);

  ROLES.forEach(async (role) => {
    await prisma.role.upsert({
      where: { name: role },
      update: {},
      create: { name: role }
    });
  });
};

const seedTestCategories = async () => {
  const TEST_CATEGORIES: string[] = Object.values(TEST_CATEGORY);

  TEST_CATEGORIES.forEach(async (testCategory) => {
    await prisma.testCategory.upsert({
      where: { name: testCategory },
      update: {},
      create: { name: testCategory }
    });
  });
};

const seedTestQuestionTypes = async () => {
  const TEST_QUESTION_TYPES: string[] = Object.values(TEST_QUESTION_TYPE);

  TEST_QUESTION_TYPES.forEach(async (testQuestionType) => {
    await prisma.testQuestionType.upsert({
      where: { name: testQuestionType },
      update: {},
      create: { name: testQuestionType }
    });
  });
};

const seedAdminUser = async () => {
  const adminRole: Role | null = await prisma.role.findUnique({
    where: { name: ROLE.ADMIN }
  });

  const userRole: Role | null = await prisma.role.findUnique({
    where: { name: ROLE.USER }
  });

  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL! },
    update: {},
    create: {
      email: ADMIN_EMAIL!,
      username: ADMIN_USERNAME!,
      password: await bcrypt.hash(ADMIN_PASSWORD!, 10),
      emailVerified: true,
      roles: {
        create: [
          { role: { connect: { id: adminRole!.id } } },
          { role: { connect: { id: userRole!.id } } }
        ]
      }
    }
  });
};

const seed = async () => {
  seedRoles();
  seedTestCategories();
  seedTestQuestionTypes();

  seedAdminUser();
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());

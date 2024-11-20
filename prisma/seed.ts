import * as bcrypt from 'bcrypt';

import prisma from '../server/utils/prisma';

import { ROLE, TEST_CATEGORY, TEST_QUESTION_TYPE } from '@/constants/seed';

const { ADMIN_EMAIL, ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

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
  await prisma.user.upsert({
    where: { email: ADMIN_EMAIL as string },
    update: {},
    create: {
      email: ADMIN_EMAIL as string,
      name: ADMIN_USERNAME as string,
      username: ADMIN_USERNAME as string,
      password: await bcrypt.hash(ADMIN_PASSWORD as string, 10),
      emailVerified: true,
      roles: {
        create: [
          { role: { connect: { name: ROLE.ADMIN } } },
          { role: { connect: { name: ROLE.USER } } }
        ]
      },
      tests: {
        create: [
          {
            title: 'Example test title',
            description: 'Example test description',
            categories: {
              create: [
                { category: { connect: { name: TEST_CATEGORY.TECHNOLOGY } } },
                { category: { connect: { name: TEST_CATEGORY.UNIVERSITY } } }
              ]
            },
            questions: {
              create: [
                {
                  number: 1,
                  text: 'Single example question',
                  type: { connect: { name: TEST_QUESTION_TYPE.SINGLE } },
                  options: {
                    create: [
                      { text: 'Single example option 1', isCorrect: true },
                      { text: 'Single example option 2', isCorrect: false },
                      { text: 'Single example option 3', isCorrect: false },
                      { text: 'Single example option 4', isCorrect: false }
                    ]
                  }
                },
                {
                  number: 2,
                  text: 'Multiple example question',
                  type: { connect: { name: TEST_QUESTION_TYPE.MULTIPLE } },
                  options: {
                    create: [
                      { text: 'Multiple example option 1', isCorrect: true },
                      { text: 'Multiple example option 2', isCorrect: true },
                      { text: 'Multiple example option 3', isCorrect: false },
                      { text: 'Multiple example option 4', isCorrect: false }
                    ]
                  }
                }
              ]
            },
            views: {
              create: [{}, {}] // 2 views
            }
          }
        ]
      }
    }
  });
};

const seed = async () => {
  seedRoles();
  seedTestCategories();
  seedTestQuestionTypes();

  // seedAdminUser();
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());

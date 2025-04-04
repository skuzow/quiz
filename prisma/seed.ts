import prisma from '../server/utils/prisma';

import {
  TestCategoryValues,
  TestQuestionTypeValues
} from '../shared/constants/test.constant';

const seedTestCategories = async () => {
  TestCategoryValues.forEach(async (testCategory) => {
    await prisma.testCategory.upsert({
      where: { name: testCategory },
      update: {},
      create: { name: testCategory }
    });
  });
};

const seedTestQuestionTypes = async () => {
  TestQuestionTypeValues.forEach(async (testQuestionType) => {
    await prisma.testQuestionType.upsert({
      where: { name: testQuestionType },
      update: {},
      create: { name: testQuestionType }
    });
  });
};

const seed = async () => {
  seedTestCategories();
  seedTestQuestionTypes();
};

seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect());

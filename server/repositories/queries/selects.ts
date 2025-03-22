import type { Prisma } from '@prisma/client';

export const ROLE_SELECT: Prisma.UserToRoleSelect = {
  role: { select: { name: true } }
};

export const USER_PARTIAL_SELECT: Prisma.UserSelect = {
  id: true,
  name: true,
  username: true,
  image: true
};

export const USER_TEST_PARTIAL_SELECT: Prisma.UserTestSelect = {
  id: true,
  title: true,
  description: true,
  image: true,
  published: true,
  categories: {
    select: {
      category: { select: { name: true } }
    }
  },
  _count: {
    select: { questions: true, completed: true }
  },
  createdAt: true
};

export const USER_TEST_PARTIAL_AUTHOR_SELECT: Prisma.UserTestSelect = {
  ...USER_TEST_PARTIAL_SELECT,
  author: {
    select: USER_PARTIAL_SELECT
  }
};

export const USER_TEST_COMPLETED_SELECT: Prisma.UserTestCompletedSelect = {
  id: true,
  completedAt: true
};

export const USER_SELECT: Prisma.UserSelect = {
  ...USER_PARTIAL_SELECT,
  roles: {
    select: ROLE_SELECT
  },
  createdAt: true
};

export const USER_TEST_SELECT: Prisma.UserTestSelect = {
  ...USER_TEST_PARTIAL_AUTHOR_SELECT,
  questions: {
    select: {
      number: true,
      text: true,
      image: true,
      type: { select: { name: true } },
      options: {
        select: {
          number: true,
          text: true,
          isCorrect: true
        }
      }
    }
  }
};

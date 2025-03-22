/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Prisma } from '@prisma/client';

import {
  USER_TEST_SELECT,
  USER_TEST_PARTIAL_AUTHOR_SELECT,
  USER_TEST_PARTIAL_SELECT
} from './queries/selects';

import {
  TEST_SEARCH_PAGE_SIZE,
  TestOrder
} from '#shared/constants/test.constant';

const enum SortOrder {
  DESC = 'desc',
  ASC = 'asc'
}

class TestRepository {
  private userTestModel = prisma.userTest;

  private testSortMap: Record<
    TestOrder,
    Prisma.UserTestOrderByWithRelationInput
  > = {
    [TestOrder.NEWEST]: { createdAt: SortOrder.DESC },
    [TestOrder.OLDEST]: { createdAt: SortOrder.ASC },
    [TestOrder.MOSTPOPULAR]: { views: { _count: SortOrder.DESC } },
    [TestOrder.LEASTPOPULAR]: { views: { _count: SortOrder.ASC } },
    [TestOrder.LONGEST]: { questions: { _count: SortOrder.DESC } },
    [TestOrder.SHORTEST]: { questions: { _count: SortOrder.ASC } }
  };

  async findById(id: string): Promise<UserTest | null> {
    const test = await this.userTestModel.findFirst({
      where: { id: id },
      select: USER_TEST_SELECT
    });

    if (!test) return null;

    return this.transformUserTest(test);
  }

  async findAll(
    authUserId: string | undefined,
    { page, search, sort, filter }: TestSearch
  ): Promise<UserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      where: {
        AND: [
          this.visibleTests(authUserId),
          this.searchTests(search),
          this.filterTests(filter)
        ]
      },
      skip: this.skipTests(page),
      take: TEST_SEARCH_PAGE_SIZE,
      orderBy: this.sortTests(sort),
      select: USER_TEST_PARTIAL_AUTHOR_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async findAllById(
    id: string,
    authUserId: string | undefined,
    { page, search, sort, filter }: TestSearch
  ): Promise<UserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      where: {
        AND: [
          { authorId: id },
          this.visibleTests(authUserId),
          this.searchTests(search),
          this.filterTests(filter)
        ]
      },
      skip: this.skipTests(page),
      take: TEST_SEARCH_PAGE_SIZE,
      orderBy: this.sortTests(sort),
      select: USER_TEST_PARTIAL_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async findAllByUsername(
    username: string,
    authUserId: string | undefined,
    { page, search, sort, filter }: TestSearch
  ): Promise<UserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      where: {
        AND: [
          { author: { username: username } },
          this.visibleTests(authUserId),
          this.searchTests(search),
          this.filterTests(filter)
        ]
      },
      skip: this.skipTests(page),
      take: TEST_SEARCH_PAGE_SIZE,
      orderBy: this.sortTests(sort),
      select: USER_TEST_PARTIAL_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async create(
    authUserId: string,
    { published, title, description, categories, questions }: TestCreation
  ): Promise<UserTest> {
    const test = await this.userTestModel.create({
      data: {
        author: { connect: { id: authUserId } },
        published,
        title,
        description,
        categories: categories?.length
          ? {
              create: categories.map((category) => ({
                category: { connect: { name: category } }
              }))
            }
          : undefined,
        questions: {
          create: questions.map((question, indexQuestion) => ({
            number: indexQuestion,
            text: question.text,
            type: { connect: { name: question.type } },
            options: {
              create: question.options.map((option, indexOption) => ({
                number: indexOption,
                text: option.text,
                isCorrect: option.isCorrect
              }))
            }
          }))
        }
      },
      select: USER_TEST_SELECT
    });

    return this.transformUserTest(test);
  }

  async generate(dto: TestGeneration): Promise<TestCreation> {
    const { quizAi } = useRuntimeConfig();

    const test = await $fetch<TestCreation>(`${quizAi.apiUrl}/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${quizAi.apiKey}`
      },
      body: dto
    });

    return test;
  }

  async update(
    id: string,
    { published, title, description, categories, questions }: TestCreation
  ): Promise<UserTest> {
    const test = await this.userTestModel.update({
      where: { id },
      data: {
        published,
        title,
        description,
        categories: categories?.length
          ? {
              deleteMany: {},
              create: categories.map((category) => ({
                category: { connect: { name: category } }
              }))
            }
          : { deleteMany: {} },
        questions: {
          deleteMany: {},
          create: questions.map((question, indexQuestion) => ({
            number: indexQuestion,
            text: question.text,
            type: { connect: { name: question.type } },
            options: {
              create: question.options.map((option, indexOption) => ({
                number: indexOption,
                text: option.text,
                isCorrect: option.isCorrect
              }))
            }
          }))
        }
      },
      select: USER_TEST_SELECT
    });

    return this.transformUserTest(test);
  }

  async delete(id: string) {
    await this.userTestModel.delete({ where: { id } });
  }

  private visibleTests(authUserId?: string) {
    return {
      OR: [{ published: { equals: true as const } }, { authorId: authUserId }]
    };
  }

  private searchTests(search: TestSearch['search']) {
    if (!search) return {};

    return {
      OR: [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    };
  }

  private filterTests(filter: TestSearch['filter']) {
    if (!filter) return {};

    return {
      categories: { some: { category: { name: filter } } }
    };
  }

  private skipTests(page: TestSearch['page']): number {
    return page * TEST_SEARCH_PAGE_SIZE;
  }

  private sortTests(sort: TestSearch['sort']) {
    if (!sort) return {};

    return this.testSortMap[sort];
  }

  private transformUserTest(test: any): UserTest {
    return {
      ...test,
      categories: test.categories.map(
        (category: any) => category.category.name
      ),
      questions: test.questions
        .map((question: any) => ({
          ...question,
          type: question.type.name
        }))
        .toReversed(),
      views: test._count.views,
      _count: undefined
    };
  }

  private transformUserTestsPartial(tests: any): UserTestPartial[] {
    return tests.map((test: any) => ({
      ...test,
      categories: test.categories.map(
        (category: any) => category.category.name
      ),
      questions: test._count.questions,
      views: test._count.views,
      _count: undefined
    }));
  }
}

export default TestRepository;

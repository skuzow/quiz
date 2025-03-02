/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  USER_TEST_SELECT,
  USER_TEST_PARTIAL_AUTHOR_SELECT,
  USER_TEST_PARTIAL_SELECT
} from './queries/selects';

import { TEST_SEARCH_PAGE_SIZE } from '#shared/constants/test.constant';

class TestRepository {
  private userTestModel = prisma.userTest;

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
    { page, search }: TestSearch
  ): Promise<UserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      where: {
        AND: [
          {
            OR: [
              { published: { equals: true as const } },
              { authorId: authUserId }
            ]
          },
          this.searchTests(search)
        ]
      },
      skip: this.skipTests(page),
      take: TEST_SEARCH_PAGE_SIZE,
      select: USER_TEST_PARTIAL_AUTHOR_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async findAllById(
    id: string,
    authUserId: string | undefined,
    { page, search }: TestSearch
  ): Promise<UserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      where: {
        AND: [
          { authorId: id },
          {
            OR: [
              { published: { equals: true as const } },
              { authorId: authUserId }
            ]
          },
          this.searchTests(search)
        ]
      },
      skip: this.skipTests(page),
      take: TEST_SEARCH_PAGE_SIZE,
      select: USER_TEST_PARTIAL_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async findAllByUsername(
    username: string,
    authUserId: string | undefined,
    { page, search }: TestSearch
  ): Promise<UserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      where: {
        AND: [
          { author: { username: username } },
          {
            OR: [
              { published: { equals: true as const } },
              { authorId: authUserId }
            ]
          },
          this.searchTests(search)
        ]
      },
      skip: this.skipTests(page),
      take: TEST_SEARCH_PAGE_SIZE,
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

  private skipTests(page: number): number {
    return page * TEST_SEARCH_PAGE_SIZE;
  }

  private searchTests(search?: string) {
    if (!search) return {};

    return {
      OR: [
        { title: { contains: search } },
        { description: { contains: search } }
      ]
    };
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

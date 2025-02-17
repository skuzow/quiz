/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  USER_TEST_SELECT,
  USER_TEST_PARTIAL_AUTHOR_SELECT,
  USER_TEST_PARTIAL_SELECT
} from './queries/selects';

import { TESTS_PAGE_SIZE } from '#shared/constants/test';

class TestRepository {
  private userTestModel = prisma.userTest;

  async findById(id: string): Promise<IUserTest | null> {
    const test = await this.userTestModel.findFirst({
      where: { id: id },
      select: USER_TEST_SELECT
    });

    if (!test) return null;

    return this.transformUserTest(test);
  }

  async findAll(
    page: number,
    search?: string
  ): Promise<IUserTestPartial[] | null> {
    const skip: number = this.skipTests(page);

    const tests = await this.userTestModel.findMany({
      where: { ...this.searchTests(search) },
      skip,
      take: this.takeTests(skip),
      select: USER_TEST_PARTIAL_AUTHOR_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async findAllById(
    id: string,
    page: number,
    search?: string
  ): Promise<IUserTestPartial[] | null> {
    const skip: number = this.skipTests(page);

    const tests = await this.userTestModel.findMany({
      where: {
        authorId: id,
        ...this.searchTests(search)
      },
      skip,
      take: this.takeTests(skip),
      select: USER_TEST_PARTIAL_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async findAllByUsername(
    username: string,
    page: number,
    search?: string
  ): Promise<IUserTestPartial[] | null> {
    const skip: number = this.skipTests(page);

    const tests = await this.userTestModel.findMany({
      where: {
        author: { username: username },
        ...this.searchTests(search)
      },
      skip,
      take: this.takeTests(skip),
      select: USER_TEST_PARTIAL_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async create(
    userId: string,
    { title, description, categories, questions }: IUserTest
  ): Promise<IUserTest> {
    const test = await this.userTestModel.create({
      data: {
        author: { connect: { id: userId } },
        title,
        description,
        categories: categories
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

  async createWithAI({
    lang,
    questions,
    info
  }: IUserTestAI): Promise<IUserTest> {
    const { quizAi } = useRuntimeConfig();

    const test = await $fetch(`${quizAi.apiUrl}/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${quizAi.apiKey}`
      },
      body: JSON.stringify({ lang, questions, info })
    });

    return test as IUserTest;
  }

  async update(
    id: string,
    { title, description, categories, questions }: IUserTest
  ): Promise<IUserTest> {
    const test = await this.userTestModel.update({
      where: { id },
      data: {
        title,
        description,
        categories: categories
          ? {
              deleteMany: {},
              create: categories.map((category) => ({
                category: { connect: { name: category } }
              }))
            }
          : undefined,
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
    return page * TESTS_PAGE_SIZE;
  }

  private takeTests(skip: number): number {
    return skip + TESTS_PAGE_SIZE;
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

  private transformUserTest(test: any): IUserTest {
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

  private transformUserTestsPartial(tests: any): IUserTestPartial[] {
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

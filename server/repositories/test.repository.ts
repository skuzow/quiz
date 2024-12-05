/* eslint-disable @typescript-eslint/no-explicit-any */
import { USER_TEST_SELECT, USER_TEST_PARTIAL_SELECT } from './queries/selects';

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
    skip: number,
    take: number
  ): Promise<IUserTestPartial[] | null> {
    const tests = await this.userTestModel.findMany({
      skip: skip,
      take: take,
      select: USER_TEST_PARTIAL_SELECT
    });

    if (!tests || tests.length === 0) return null;

    return this.transformUserTestsPartial(tests);
  }

  async createWithAI(
    { lang, questions, info }: IUserTestAI,
    headers: any
  ): Promise<IUserTest> {
    const session = await auth.api.getSession({ headers });

    if (!session) {
      throw {
        statusCode: 401,
        statusMessage: 'Unauthorized'
      };
    }

    const { quizAi } = useRuntimeConfig();

    const test: IUserTest = await $fetch(`${quizAi.apiUrl}/tests`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${quizAi.apiKey}`
      },
      body: JSON.stringify({ lang, questions, info })
    });

    return test;
  }

  private transformUserTest(test: any): IUserTest {
    return {
      ...test,
      categories: test.categories.map(
        (category: any) => category.category.name
      ),
      questions: test.questions.map((question: any) => ({
        ...question,
        type: question.type.name
      })),
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
      views: test._count.views,
      _count: undefined
    }));
  }
}

export default TestRepository;

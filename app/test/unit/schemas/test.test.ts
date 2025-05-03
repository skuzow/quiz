import { describe, it, expect } from 'vitest';

import {
  TestCreationSchema,
  TestGenerationSchema,
  TestSearchSchema,
  TestCompletionSchema
} from '#shared/schemas/test.schema';
import {
  TestOrder,
  TestCategory,
  TestQuestionType,
  TEST_GENERATION_QUESTIONS_MAX,
  TEST_GENERATION_TEXT_MIN
} from '#shared/constants/test.constant';

describe('TestSchema', () => {
  it('should validate test creation correctly', async () => {
    const validTestCreation: TestCreation = {
      published: true,
      title: 'example title',
      description: 'example description',
      categories: [TestCategory.TECHNOLOGY, TestCategory.PROGRAMMING],
      questions: [
        {
          text: 'example single question',
          type: TestQuestionType.SINGLE,
          options: [
            { text: 'example single option 1', isCorrect: true },
            { text: 'example single option 2', isCorrect: false }
          ]
        },
        {
          text: 'example multiple question',
          type: TestQuestionType.MULTIPLE,
          options: [
            { text: 'example multiple option 1', isCorrect: true },
            { text: 'example multiple option 2', isCorrect: true }
          ]
        }
      ]
    };

    const result = TestCreationSchema.safeParse(validTestCreation);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid test creation', async () => {
    const invalidTestCreation = {
      title: 'example title',
      description: 'example description',
      categories: ['example'],
      questions: [
        {
          text: 'example single question',
          type: TestQuestionType.SINGLE,
          options: [{ text: 'example single option 1', isCorrect: true }]
        },
        {
          text: 'example single question',
          type: TestQuestionType.SINGLE,
          options: [
            { text: 'example single option 1', isCorrect: false },
            { text: 'example single option 2', isCorrect: false }
          ]
        },
        {
          text: 'example single question',
          type: TestQuestionType.SINGLE,
          options: [
            { text: 'example single option 1', isCorrect: true },
            { text: 'example single option 2', isCorrect: true }
          ]
        }
      ]
    };

    const result = TestCreationSchema.safeParse(invalidTestCreation);

    const issues = result.error?.issues.map((issue) => issue.message);

    expect(result.success).toBe(false);
    expect(issues?.[0]).contains('Invalid enum value');
    expect(issues?.[1]).toBe('Array must contain at least 2 element(s)');
    expect(issues?.[2]).toBe('Invalid input');
    expect(issues?.[3]).toBe('Invalid input');
    expect(issues?.[4]).toBe('Invalid input');
  });

  it('should validate test generation correctly', async () => {
    const validTestGeneration: TestGeneration = {
      deep: true,
      lang: 'en',
      questions: {
        number: 5,
        type: TestQuestionType.SINGLE,
        options: 2
      },
      info: 'example info'
    };

    const result = TestGenerationSchema.safeParse(validTestGeneration);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid test generation', async () => {
    const invalidTestGeneration = {
      deep: true,
      lang: 'e',
      questions: {
        number: 11,
        type: 'example',
        options: 2.5
      },
      info: 'e'
    };

    const result = TestGenerationSchema.safeParse(invalidTestGeneration);

    const issues = result.error?.issues.map((issue) => issue.message);

    expect(result.success).toBe(false);
    expect(issues?.[0]).toBe('String must contain exactly 2 character(s)');
    expect(issues?.[1]).toBe(
      `Number must be less than or equal to ${TEST_GENERATION_QUESTIONS_MAX}`
    );
    expect(issues?.[2]).contains('Invalid enum value');
    expect(issues?.[3]).toBe('Expected integer, received float');
    expect(issues?.[4]).toBe(
      `String must contain at least ${TEST_GENERATION_TEXT_MIN} character(s)`
    );
  });

  it('should validate test search correctly', async () => {
    const validTestSearch: TestSearch = {
      page: 0,
      search: 'example',
      sort: TestOrder.NEWEST,
      filter: TestCategory.TECHNOLOGY
    };

    const result = TestSearchSchema.safeParse(validTestSearch);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid test search', async () => {
    const invalidTestSearch = {
      page: -1,
      sort: 'example',
      filter: 'example'
    };

    const result = TestSearchSchema.safeParse(invalidTestSearch);

    const issues = result.error?.issues.map((issue) => issue.message);

    expect(result.success).toBe(false);
    expect(issues?.[0]).toBe('Number must be greater than or equal to 0');
    expect(issues?.[1]).contains('Invalid enum value');
    expect(issues?.[2]).contains('Invalid enum value');
  });

  it('should validate test completion correctly', async () => {
    const validTestCompletion: TestCompletion = {
      score: 8.75
    };

    const result = TestCompletionSchema.safeParse(validTestCompletion);

    expect(result.success).toBe(true);
    expect(result.error).toBeUndefined();
  });

  it('should return invalid test completion', async () => {
    const validTestCompletion: TestCompletion = {
      score: 3.255
    };

    const result = TestCompletionSchema.safeParse(validTestCompletion);

    const issues = result.error?.issues.map((issue) => issue.message);

    expect(result.success).toBe(false);
    expect(issues?.[0]).toBe('Number must be a multiple of 0.01');
  });
});

export enum TestCategory {
  TECHNOLOGY = 'TECHNOLOGY',
  UNIVERSITY = 'UNIVERSITY',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  LITERATURE = 'LITERATURE'
}

export const TestCategoryValues = Object.values(TestCategory) as [
  keyof typeof TestCategory
];

export enum TestQuestionType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE'
}

export const TestQuestionTypeValues = Object.values(TestQuestionType) as [
  keyof typeof TestQuestionType
];

export const TEST_QUESTION_OPTIONS_MAX: number = 10;

export const TEST_GENERATION_QUESTIONS_MIN: number = 1;
export const TEST_GENERATION_QUESTIONS_MAX: number = 10;
export const TEST_GENERATION_QUESTION_OPTIONS_MIN: number = 2;
export const TEST_GENERATION_QUESTION_OPTIONS_MAX: number = 4;
export const TEST_GENERATION_TEXT_MIN: number = 10;

export const TESTS_PAGE_SIZE: number = 10;

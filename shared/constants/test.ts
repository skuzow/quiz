export enum TestCategory {
  TECHNOLOGY = 'TECHNOLOGY',
  UNIVERSITY = 'UNIVERSITY',
  SCIENCE = 'SCIENCE',
  HISTORY = 'HISTORY',
  LITERATURE = 'LITERATURE'
}

export enum TestQuestionType {
  SINGLE = 'SINGLE',
  MULTIPLE = 'MULTIPLE'
}

export const TestQuestionTypeValues = Object.values(TestQuestionType) as [
  keyof typeof TestQuestionType
];

export const MAX_TEST_OPTIONS: number = 10;

export const TESTS_PAGE_SIZE: number = 10;

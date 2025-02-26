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

export const TEST_CREATION_TITLE_MIN: number = 10;
export const TEST_CREATION_TITLE_MAX: number = 150;
export const TEST_CREATION_DESCRIPTION_MIN: number = 10;
export const TEST_CREATION_DESCRIPTION_MAX: number = 500;
export const TEST_CREATION_QUESTIONS_MIN: number = 1;
export const TEST_CREATION_QUESTIONS_MAX: number = 100;
export const TEST_CREATION_QUESTION_TEXT_MIN: number = 10;
export const TEST_CREATION_QUESTION_TEXT_MAX: number = 150;
export const TEST_CREATION_QUESTION_OPTIONS_MIN: number = 2;
export const TEST_CREATION_QUESTION_OPTIONS_MAX: number = 10;
export const TEST_CREATION_QUESTION_OPTION_TEXT_MIN: number = 1;
export const TEST_CREATION_QUESTION_OPTION_TEXT_MAX: number = 150;

export const TEST_GENERATION_QUESTIONS_MIN: number = 1;
export const TEST_GENERATION_QUESTIONS_MAX: number = 10;
export const TEST_GENERATION_QUESTION_OPTIONS_MIN: number = 2;
export const TEST_GENERATION_QUESTION_OPTIONS_MAX: number = 4;
export const TEST_GENERATION_TEXT_MIN: number = 10;

export const TESTS_PAGE_SIZE: number = 10;

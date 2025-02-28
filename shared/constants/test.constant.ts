export enum TestOrder {
  ASC = 'ASC',
  DESC = 'DESC'
}

export const TestOrderValues = Object.values(TestOrder) as [
  keyof typeof TestOrder
];

export enum TestCategory {
  TECHNOLOGY = 'TECHNOLOGY',
  PROGRAMMING = 'PROGRAMMING',
  SCIENCE = 'SCIENCE',
  MATH = 'MATH',
  HISTORY = 'HISTORY',
  GEOGRAPHY = 'GEOGRAPHY',
  LITERATURE = 'LITERATURE',
  ART = 'ART',
  SPORTS = 'SPORTS',
  MUSIC = 'MUSIC',
  MOVIES = 'MOVIES',
  GAMES = 'GAMES',
  FOOD = 'FOOD',
  ANIMALS = 'ANIMALS',
  LANGUAGES = 'LANGUAGES'
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

export const TEST_SEARCH_PAGE_SIZE: number = 10;
export const TEST_SEARCH_TEXT_MAX: number = 150;

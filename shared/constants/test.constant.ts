export enum TestOrder {
  NEWEST = 'newest',
  OLDEST = 'oldest',
  MOSTPOPULAR = 'mostpopular',
  LEASTPOPULAR = 'leastpopular',
  LONGEST = 'longest',
  SHORTEST = 'shortest'
}

export const TestOrderValues = Object.values(TestOrder);

export enum TestCategory {
  TECHNOLOGY = 'technology',
  PROGRAMMING = 'programming',
  SCIENCE = 'science',
  MATH = 'math',
  HISTORY = 'history',
  GEOGRAPHY = 'geography',
  LITERATURE = 'literature',
  ART = 'art',
  SPORTS = 'sports',
  MUSIC = 'music',
  MOVIES = 'movies',
  GAMES = 'games',
  FOOD = 'food',
  ANIMALS = 'animals',
  LANGUAGES = 'languages'
}

export const TestCategoryValues = Object.values(TestCategory);

export enum TestQuestionType {
  SINGLE = 'single',
  MULTIPLE = 'multiple'
}

export const TestQuestionTypeValues = Object.values(TestQuestionType);

export const TEST_CREATION_TITLE_MIN: number = 10;
export const TEST_CREATION_TITLE_MAX: number = 150;
export const TEST_CREATION_DESCRIPTION_MIN: number = 10;
export const TEST_CREATION_DESCRIPTION_MAX: number = 500;
export const TEST_CREATION_CATEGORIES_MAX: number = 2;
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

enum MinMax {
  MIN = 'least',
  MAX = 'most'
}

export const useFormMessage = () => {
  const { t: $t } = useI18n();

  enum FormInput {
    EMAIL = 'email',
    NAME = 'name',
    USERNAME = 'username',
    PASSWORD = 'password',
    FILE = 'file',
    TEXT = 'text',
    QUESTIONS = 'questions',
    TITLE = 'title',
    DESCRIPTION = 'description',
    QUESTION = 'question',
    OPTIONS = 'options',
    OPTION = 'option',
    CORRECT_OPTIONS = 'correctOptions',
    ANSWERED_QUESTIONS = 'answeredQuestions',
    SEARCH = 'search'
  }

  const requiredMessage = (input: FormInput) =>
    `${$t(`form.${input}`)} ${$t('form.required')}.`;

  const minMessage = (input: FormInput, value: number, characters?: boolean) =>
    minMaxMessage(input, MinMax.MIN, value, characters);

  const maxMessage = (input: FormInput, value: number, characters?: boolean) =>
    minMaxMessage(input, MinMax.MAX, value, characters);

  const minMaxMessage = (
    input: FormInput,
    type: MinMax,
    value: number,
    characters: boolean = true
  ) =>
    `${$t(`form.${input}`)} ${$t(`form.${type}`)} ${value}${characters ? ` ${$t('form.characters')}` : ''}.`;

  const alreadyUseMessage = (input: FormInput) =>
    `${$t(`form.${input}`)} ${$t('form.use')}.`;

  const exampleMessage = (input: FormInput, number?: number) =>
    `${number || ''} ${$t('form.example')} ${$t(`form.${input}`)}`;

  return {
    FormInput,
    requiredMessage,
    minMessage,
    maxMessage,
    alreadyUseMessage,
    exampleMessage
  };
};

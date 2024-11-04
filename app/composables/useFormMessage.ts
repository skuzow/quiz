enum MinMax {
  MIN = 'least',
  MAX = 'most'
}

export const useFormMessage = () => {
  const { t: $t } = useI18n();

  enum FormInput {
    EMAIL = 'email',
    USERNAME = 'username',
    PASSWORD = 'password'
  }

  const requiredMessage = (input: FormInput) =>
    `${$t(`form.${input}`)} ${$t('form.required')}.`;

  const minMessage = (input: FormInput, value: number) =>
    minMaxMessage(input, MinMax.MIN, value);

  const maxMessage = (input: FormInput, value: number) =>
    minMaxMessage(input, MinMax.MAX, value);

  const minMaxMessage = (input: FormInput, type: MinMax, value: number) =>
    `${$t(`form.${input}`)} ${$t(`form.${type}`)} ${value} ${$t('form.characters')}.`;

  return {
    FormInput,
    requiredMessage,
    minMessage,
    maxMessage
  };
};

import type { FormInput } from '@/constants/form.constant';

enum MinMax {
  MIN = 'least',
  MAX = 'most'
}

export const useFormMessage = () => {
  const { t: $t } = useI18n();

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
    requiredMessage,
    minMessage,
    maxMessage,
    alreadyUseMessage,
    exampleMessage
  };
};

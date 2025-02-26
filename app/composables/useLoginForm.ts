import { z } from 'zod';

import {
  USER_EMAIL_MAX,
  USER_PASSWORD_MIN,
  USER_PASSWORD_MAX
} from '#shared/constants/user.constant';

export const useLoginForm = () => {
  const { t: $t } = useI18n();
  const localePath = useLocalePath();

  const { signIn } = useAuth();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const isLoadingWithEmail: Ref<boolean> = ref(false);
  const errorMessageWithEmail: Ref<string | undefined> = ref(undefined);

  const formSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(USER_EMAIL_MAX, {
        message: maxMessage(FormInput.EMAIL, USER_EMAIL_MAX)
      }),
    password: z
      .string({
        required_error: requiredMessage(FormInput.PASSWORD)
      })
      .min(USER_PASSWORD_MIN, {
        message: minMessage(FormInput.PASSWORD, USER_PASSWORD_MIN)
      })
      .max(USER_PASSWORD_MAX, {
        message: maxMessage(FormInput.PASSWORD, USER_PASSWORD_MAX)
      })
  });

  type LoginForm = z.TypeOf<typeof formSchema>;

  const fieldConfig = {
    email: {
      label: $t('form.email'),
      inputProps: {
        type: 'email',
        placeholder: 'example@skuzow.com'
      }
    },

    password: {
      label: $t('form.password'),
      inputProps: {
        type: 'password',
        placeholder: '••••••••'
      }
    }
  };

  const loginWithEmail = async ({ email, password }: LoginForm) => {
    if (isLoadingWithEmail.value) return;

    isLoadingWithEmail.value = true;

    const { error } = await signIn.email({ email, password });

    isLoadingWithEmail.value = false;

    if (error) {
      if (error.code === 'INVALID_EMAIL_OR_PASSWORD')
        errorMessageWithEmail.value = $t('form.invalidEmailOrPassword');
      else errorMessageWithEmail.value = error.message;

      clearPasswordInput();
    } else await navigateTo(localePath('/tests'));
  };

  return {
    isLoadingWithEmail,
    errorMessageWithEmail,
    formSchema,
    fieldConfig,
    loginWithEmail
  };
};

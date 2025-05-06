import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { FormInput } from '@/constants/form.constant';
import {
  USER_EMAIL_MAX,
  USER_PASSWORD_MIN,
  USER_PASSWORD_MAX
} from '#shared/constants/user.constant';

export const useLogin = () => {
  const { t: $t } = useI18n();
  const localePath = useLocalePath();

  const { signIn } = useAuth();

  const { requiredMessage, minMessage, maxMessage } = useFormMessage();

  const { alert } = useAlert();

  const isLoadingWithEmail: Ref<boolean> = ref(false);
  const errorMessageWithEmail: Ref<string | undefined> = ref();

  const LoginSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(USER_EMAIL_MAX, {
        message: maxMessage(FormInput.EMAIL, USER_EMAIL_MAX)
      })
      .trim(),
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

  type LoginForm = z.TypeOf<typeof LoginSchema>;

  const validationSchema = toTypedSchema(LoginSchema);

  const loginForm = useForm({
    validationSchema
  });

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

  const errorMessageMap: Record<string, string> = {
    INVALID_EMAIL_OR_PASSWORD: $t('form.invalidEmailOrPassword'),
    EMAIL_NOT_VERIFIED: $t('form.emailNotVerified')
  };

  const loginWithEmail = async ({ email, password }: LoginForm) => {
    if (isLoadingWithEmail.value) return;

    isLoadingWithEmail.value = true;

    const { error } = await signIn.email({ email, password });

    isLoadingWithEmail.value = false;

    if (error) {
      errorMessageWithEmail.value =
        errorMessageMap[error.code!] || error.message;

      if (error.code === 'EMAIL_NOT_VERIFIED') {
        await navigateTo(localePath('/tests'));

        alert({
          title: $t('alert.verifyEmail.title'),
          description: $t('alert.verifyEmail.description'),
          confirm: $t('understood')
        });
      } else loginForm.resetField(FormInput.PASSWORD);
    } else await navigateTo(localePath('/tests'));
  };

  return {
    isLoadingWithEmail,
    errorMessageWithEmail,
    LoginSchema,
    loginForm,
    fieldConfig,
    loginWithEmail
  };
};

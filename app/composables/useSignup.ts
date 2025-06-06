import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { FormInput } from '@/constants/form.constant';
import {
  USER_EMAIL_MAX,
  USER_NAME_MIN,
  USER_NAME_MAX,
  USER_USERNAME_MIN,
  USER_USERNAME_MAX,
  USER_PASSWORD_MIN,
  USER_PASSWORD_MAX
} from '#shared/constants/user.constant';

const CHECK_TIMEOUT: number = 1000;

export const useSignup = () => {
  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();
  const localePath = useLocalePath();

  const { signUp } = useAuth();

  const { requiredMessage, minMessage, maxMessage, alreadyUseMessage } =
    useFormMessage();

  const { alert } = useAlert();

  const isLoadingWithEmail: Ref<boolean> = ref(false);
  const errorMessageWithEmail: Ref<string | undefined> = ref();

  const SignupSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(USER_EMAIL_MAX, {
        message: maxMessage(FormInput.EMAIL, USER_EMAIL_MAX)
      })
      .trim()
      .refine(
        async (value) => await isEmailAvailableTimeout(value),
        alreadyUseMessage(FormInput.EMAIL)
      ),
    name: z
      .string({
        required_error: requiredMessage(FormInput.NAME)
      })
      .min(USER_NAME_MIN, {
        message: minMessage(FormInput.NAME, USER_NAME_MIN)
      })
      .max(USER_NAME_MAX, {
        message: maxMessage(FormInput.NAME, USER_NAME_MAX)
      })
      .trim(),
    username: z
      .string({
        required_error: requiredMessage(FormInput.USERNAME)
      })
      .min(USER_USERNAME_MIN, {
        message: minMessage(FormInput.USERNAME, USER_USERNAME_MIN)
      })
      .max(USER_USERNAME_MAX, {
        message: maxMessage(FormInput.USERNAME, USER_USERNAME_MAX)
      })
      .refine(
        async (value) => await isUsernameAlreadyInUseTimeout(value),
        alreadyUseMessage(FormInput.USERNAME)
      ),
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

  type SignupForm = z.TypeOf<typeof SignupSchema>;

  const validationSchema = toTypedSchema(SignupSchema);

  const signupForm = useForm({
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

    name: {
      label: $t('form.name'),
      inputProps: {
        type: 'text',
        placeholder: 'Alex'
      }
    },

    username: {
      label: $t('form.username'),
      inputProps: {
        type: 'text',
        placeholder: 'skuzow'
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

  let emailTimeout: NodeJS.Timeout;

  const isEmailAvailableTimeout = async (email: string): Promise<boolean> => {
    if (isInvalidEmail(email)) return false;

    if (emailTimeout) clearTimeout(emailTimeout);

    return new Promise((resolve) => {
      emailTimeout = setTimeout(async () => {
        const emailAvailable: boolean = await isEmailAvailable(email);

        resolve(emailAvailable);
      }, CHECK_TIMEOUT);
    });
  };

  const isInvalidEmail = (email: string): boolean => {
    return !email || email.length > USER_EMAIL_MAX || !isValidEmail(email);
  };

  const isEmailAvailable = async (email: string): Promise<boolean> => {
    try {
      const response = await $api.auth.checkEmail(email);

      return response.body.isAvailable;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  };

  let usernameTimeout: NodeJS.Timeout;

  const isUsernameAlreadyInUseTimeout = async (
    username: string
  ): Promise<boolean> => {
    if (isInvalidUsername(username)) return false;

    if (usernameTimeout) clearTimeout(usernameTimeout);

    return new Promise((resolve) => {
      usernameTimeout = setTimeout(async () => {
        const usernameAvailable: boolean = await isUsernameAvailable(username);

        resolve(usernameAvailable);
      }, CHECK_TIMEOUT);
    });
  };

  const isInvalidUsername = (username: string): boolean => {
    return (
      !username ||
      username.length < USER_USERNAME_MIN ||
      username.length > USER_USERNAME_MAX
    );
  };

  const isUsernameAvailable = async (username: string): Promise<boolean> => {
    try {
      const response = await $api.auth.checkUsername(username);

      return response.body.isAvailable;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  };

  const errorMessageMap: Record<string, string> = {
    USERNAME_IS_INVALID: $t('form.usernameFormat')
  };

  const signupWithEmail = async ({
    email,
    name,
    username,
    password
  }: SignupForm) => {
    if (isLoadingWithEmail.value) return;

    isLoadingWithEmail.value = true;

    const { error } = await signUp.email({
      email,
      name,
      password,
      username
    });

    isLoadingWithEmail.value = false;

    if (error) {
      errorMessageWithEmail.value =
        errorMessageMap[error.code!] || error.message;

      signupForm.resetField(FormInput.PASSWORD);
    } else {
      await navigateTo(localePath('/tests'));

      alert({
        title: $t('alert.verifyEmail.title'),
        description: $t('alert.verifyEmail.description'),
        confirm: $t('understood')
      });
    }
  };

  return {
    isLoadingWithEmail,
    errorMessageWithEmail,
    SignupSchema,
    signupForm,
    fieldConfig,
    signupWithEmail
  };
};

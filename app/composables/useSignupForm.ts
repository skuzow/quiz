import * as z from 'zod';

const CHECK_TIMEOUT: number = 1000;

const MAX_EMAIL_LENGTH: number = 35;
const MIN_USERNAME_LENGTH: number = 3;
const MAX_USERNAME_LENGTH: number = 20;

export const useSignupForm = () => {
  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();
  const localePath = useLocalePath();

  const { signUp } = useAuth();

  const {
    FormInput,
    requiredMessage,
    minMessage,
    maxMessage,
    alreadyUseMessage
  } = useFormMessage();

  const isLoadingWithEmail: Ref<boolean> = ref(false);
  const errorMessageWithEmail: Ref<string | undefined> = ref(undefined);

  const formSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(MAX_EMAIL_LENGTH, {
        message: maxMessage(FormInput.EMAIL, MAX_EMAIL_LENGTH)
      })
      .refine(
        async (value) => await isEmailAvailableTimeout(value),
        alreadyUseMessage(FormInput.EMAIL)
      ),

    name: z
      .string({
        required_error: requiredMessage(FormInput.NAME)
      })
      .min(3, {
        message: minMessage(FormInput.NAME, 3)
      })
      .max(40, {
        message: maxMessage(FormInput.NAME, 40)
      }),

    username: z
      .string({
        required_error: requiredMessage(FormInput.USERNAME)
      })
      .min(MIN_USERNAME_LENGTH, {
        message: minMessage(FormInput.USERNAME, MIN_USERNAME_LENGTH)
      })
      .max(MAX_USERNAME_LENGTH, {
        message: maxMessage(FormInput.USERNAME, MAX_USERNAME_LENGTH)
      })
      .refine(
        async (value) => await isUsernameAlreadyInUseTimeout(value),
        alreadyUseMessage(FormInput.USERNAME)
      ),

    password: z
      .string({
        required_error: requiredMessage(FormInput.PASSWORD)
      })
      .min(8, {
        message: minMessage(FormInput.PASSWORD, 8)
      })
      .max(32, {
        message: maxMessage(FormInput.PASSWORD, 32)
      })
  });

  type ISignup = z.TypeOf<typeof formSchema>;

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
    return !email || email.length > MAX_EMAIL_LENGTH || !isValidEmail(email);
  };

  const isEmailAvailable = async (email: string): Promise<boolean> => {
    try {
      const response: CheckResponse = await $api.auth.checkEmail(email);

      return response.body.isAvailable;
    } catch (e) {
      console.error('Error checking email:', e);

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
      username.length < MIN_USERNAME_LENGTH ||
      username.length > MAX_USERNAME_LENGTH
    );
  };

  const isUsernameAvailable = async (username: string): Promise<boolean> => {
    try {
      const response: CheckResponse = await $api.auth.checkUsername(username);

      return response.body.isAvailable;
    } catch (e) {
      console.error('Error checking username:', e);

      return false;
    }
  };

  const signupWithEmail = async ({
    email,
    name,
    username,
    password
  }: ISignup) => {
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
      errorMessageWithEmail.value = error.message;
      clearPasswordInput();
    } else await navigateTo(localePath('/tests'));
  };

  return {
    isLoadingWithEmail,
    errorMessageWithEmail,
    formSchema,
    fieldConfig,
    signupWithEmail
  };
};

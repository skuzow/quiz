import * as z from 'zod';

export const useSignupForm = () => {
  const { t: $t } = useI18n();

  const { FormInput, requiredMessage, minMessage, maxMessage } =
    useFormMessage();

  const formSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(35, {
        message: maxMessage(FormInput.EMAIL, 35)
      }),

    username: z
      .string({
        required_error: requiredMessage(FormInput.USERNAME)
      })
      .min(3, {
        message: minMessage(FormInput.USERNAME, 3)
      })
      .max(20, {
        message: maxMessage(FormInput.USERNAME, 20)
      }),

    password: z
      .string({
        required_error: requiredMessage(FormInput.PASSWORD)
      })
      .min(6, {
        message: minMessage(FormInput.PASSWORD, 6)
      })
      .max(50, {
        message: maxMessage(FormInput.PASSWORD, 50)
      })
  });

  const fieldConfig = {
    email: {
      label: $t('form.email'),
      inputProps: {
        type: 'email',
        placeholder: 'example@skuzow.com'
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

  type FormValues = z.TypeOf<typeof formSchema>;

  const onSubmitForm = (formValues: FormValues) => {
    console.log(formValues);
  };

  const signupWithGoogle = () => {};

  const signupWithGithub = () => {};

  return {
    formSchema,
    fieldConfig,
    onSubmitForm,
    signupWithGoogle,
    signupWithGithub
  };
};

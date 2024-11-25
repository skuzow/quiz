import * as z from 'zod';

export const useLoginForm = () => {
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

    password: {
      label: $t('form.password'),
      inputProps: {
        type: 'password',
        placeholder: '••••••••'
      }
    }
  };

  type FormValues = z.TypeOf<typeof formSchema>;

  const loginWithEmail = (formValues: FormValues) => {
    console.log(formValues);
  };

  const loginWithGoogle = () => {};

  const loginWithGithub = () => {};

  return {
    formSchema,
    fieldConfig,
    loginWithEmail,
    loginWithGoogle,
    loginWithGithub
  };
};

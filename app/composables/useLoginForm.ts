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
      .min(8, {
        message: minMessage(FormInput.PASSWORD, 8)
      })
      .max(32, {
        message: maxMessage(FormInput.PASSWORD, 32)
      })
  });

  type ILogin = z.TypeOf<typeof formSchema>;

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

  const loginWithEmail = (formValues: ILogin) => {
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

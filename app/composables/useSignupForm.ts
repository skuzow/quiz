import * as z from 'zod';

export const useSignupForm = () => {
  // const { t: $t } = useI18n();

  const formSchema = z.object({
    email: z
      .string({
        required_error: 'Email is required.'
      })
      .email('Invalid email format.')
      .max(35, {
        message: 'Email must be at most 35 characters.'
      }),

    username: z
      .string({
        required_error: 'Username is required.'
      })
      .min(3, {
        message: 'Username must be at least 3 characters.'
      })
      .max(20, {
        message: 'Username must be at most 20 characters.'
      }),

    password: z
      .string({
        required_error: 'Password is required.'
      })
      .min(6, {
        message: 'Password must be at least 6 characters.'
      })
      .max(50, {
        message: 'Password must be at most 50 characters.'
      })
  });

  const fieldConfig = {
    email: {
      label: 'Email',
      inputProps: {
        type: 'email',
        placeholder: 'example@skuzow.com'
      }
    },

    username: {
      label: 'Username',
      inputProps: {
        type: 'text',
        placeholder: 'skuzow'
      }
    },

    password: {
      label: 'Password',
      inputProps: {
        type: 'password',
        placeholder: '••••••••'
      }
    }
  };

  type FormValues = z.TypeOf<typeof formSchema>;

  const onSubmit = (formValues: FormValues) => {
    console.log(formValues);
  };

  return {
    formSchema,
    fieldConfig,
    onSubmit
  };
};

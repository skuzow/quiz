import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { FormInput } from '@/constants/form.constant';
import { USER_EMAIL_MAX } from '#shared/constants/user.constant';

export const useForgotPassword = () => {
  const { t: $t } = useI18n();
  const localePath = useLocalePath();

  const auth = useAuth();

  const { requiredMessage, maxMessage } = useFormMessage();

  const { alert } = useAlert();

  const isLoadingForgotPassword: Ref<boolean> = ref(false);
  const errorMessageForgotPassword: Ref<string | undefined> = ref(undefined);

  const ForgotPasswordSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(USER_EMAIL_MAX, {
        message: maxMessage(FormInput.EMAIL, USER_EMAIL_MAX)
      })
  });

  type ForgotPasswordForm = z.TypeOf<typeof ForgotPasswordSchema>;

  const validationSchema = toTypedSchema(ForgotPasswordSchema);

  const forgotPasswordForm = useForm({
    validationSchema
  });

  const fieldConfig = {
    email: {
      label: $t('form.email'),
      inputProps: {
        type: 'email',
        placeholder: 'example@skuzow.com'
      }
    }
  };

  const forgotPassword = async ({ email }: ForgotPasswordForm) => {
    if (isLoadingForgotPassword.value) return;

    isLoadingForgotPassword.value = true;

    const { error } = await auth.forgotPassword(email);

    isLoadingForgotPassword.value = false;

    if (error) {
      errorMessageForgotPassword.value = error.message;
      forgotPasswordForm.resetField(FormInput.EMAIL);
    } else {
      await navigateTo(localePath('/login'));

      alert({
        title: $t('alert.forgotPassword.title'),
        description: $t('alert.forgotPassword.description'),
        confirm: $t('understood')
      });
    }
  };

  return {
    isLoadingForgotPassword,
    errorMessageForgotPassword,
    ForgotPasswordSchema,
    forgotPasswordForm,
    fieldConfig,
    forgotPassword
  };
};

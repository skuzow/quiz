import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  USER_PASSWORD_MIN,
  USER_PASSWORD_MAX
} from '#shared/constants/user.constant';

export const useResetPassword = () => {
  const route = useRoute();

  const { t: $t } = useI18n();
  const localePath = useLocalePath();

  const auth = useAuth();

  const { requiredMessage, minMessage, maxMessage } = useFormMessage();

  const { toast } = useToast();

  const isLoadingResetPassword: Ref<boolean> = ref(false);
  const errorMessageResetPassword: Ref<string | undefined> = ref(undefined);

  const ResetPasswordSchema = z
    .object({
      password: z
        .string({
          required_error: requiredMessage(FormInput.PASSWORD)
        })
        .min(USER_PASSWORD_MIN, {
          message: minMessage(FormInput.PASSWORD, USER_PASSWORD_MIN)
        })
        .max(USER_PASSWORD_MAX, {
          message: maxMessage(FormInput.PASSWORD, USER_PASSWORD_MAX)
        }),
      confirmPassword: z
        .string({
          required_error: requiredMessage(FormInput.CONFIRM_PASSWORD)
        })
        .min(USER_PASSWORD_MIN, {
          message: minMessage(FormInput.CONFIRM_PASSWORD, USER_PASSWORD_MIN)
        })
        .max(USER_PASSWORD_MAX, {
          message: maxMessage(FormInput.CONFIRM_PASSWORD, USER_PASSWORD_MAX)
        })
    })
    .refine(
      ({ password, confirmPassword }) => password === confirmPassword,
      $t('form.passwordsNotMatch')
    );

  type ResetPasswordForm = z.TypeOf<typeof ResetPasswordSchema>;

  const validationSchema = toTypedSchema(ResetPasswordSchema);

  const resetPasswordForm = useForm({
    validationSchema
  });

  const fieldConfig = {
    password: {
      label: $t('form.password'),
      inputProps: {
        type: 'password',
        placeholder: '••••••••'
      }
    },
    confirmPassword: {
      label: $t('form.confirmPassword'),
      inputProps: {
        type: 'password',
        placeholder: '••••••••'
      }
    }
  };

  const resetPassword = async ({ password }: ResetPasswordForm) => {
    if (isLoadingResetPassword.value) return;

    isLoadingResetPassword.value = true;

    const { error } = await auth.resetPassword({
      newPassword: password,
      token: route.query.token as string
    });

    isLoadingResetPassword.value = false;

    if (error) {
      errorMessageResetPassword.value = error.message;

      resetPasswordForm.resetField(FormInput.PASSWORD);
      resetPasswordForm.resetField(FormInput.CONFIRM_PASSWORD);
    } else if (auth.isAuthenticated.value) {
      await navigateTo(auth.authUserURL.value);

      toast({ title: $t('toast.resetPassword.title') });
    } else {
      await navigateTo(localePath('/login'));

      toast({
        title: $t('toast.resetPassword.title'),
        description: $t('toast.resetPassword.description')
      });
    }
  };

  return {
    isLoadingResetPassword,
    errorMessageResetPassword,
    ResetPasswordSchema,
    resetPasswordForm,
    fieldConfig,
    resetPassword
  };
};

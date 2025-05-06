import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import { USER_EMAIL_MAX } from '#shared/constants/user.constant';

export const useAuthUpdateEmail = () => {
  const emit = getCurrentInstance()!.emit;

  const { t: $t } = useI18n();

  const { authUser, authUserURL, changeEmail } = useAuth();

  const { requiredMessage, maxMessage, alreadyUseMessage } = useFormMessage();

  const { toast } = useToast();

  const isLoadingUpdateEmail: Ref<boolean> = ref(false);
  const errorMessageUpdateEmail: Ref<string | undefined> = ref();

  const UpdateEmailSchema = z.object({
    email: z
      .string({
        required_error: requiredMessage(FormInput.EMAIL)
      })
      .email($t('form.emailFormat'))
      .max(USER_EMAIL_MAX, {
        message: maxMessage(FormInput.EMAIL, USER_EMAIL_MAX)
      })
      .trim()
  });

  type UpdateEmailForm = z.TypeOf<typeof UpdateEmailSchema>;

  const validationSchema = toTypedSchema(UpdateEmailSchema);

  const updateEmailForm = useForm({
    validationSchema
  });

  const fieldConfig = {
    email: {
      label: $t('form.email'),
      inputProps: {
        type: 'email',
        placeholder: authUser.value?.email
      }
    }
  };

  const errorMessageMap: Record<string, string> = {
    COULDNT_UPDATE_YOUR_EMAIL: alreadyUseMessage(FormInput.EMAIL),
    EMAIL_IS_THE_SAME: alreadyUseMessage(FormInput.EMAIL)
  };

  const updateEmail = async ({ email }: UpdateEmailForm) => {
    if (isLoadingUpdateEmail.value) return;

    isLoadingUpdateEmail.value = true;

    const { error } = await changeEmail({
      newEmail: email,
      callbackURL: authUserURL.value
    });

    isLoadingUpdateEmail.value = false;

    if (error) {
      errorMessageUpdateEmail.value =
        errorMessageMap[error.code!] || error.message;
    } else {
      closeUpdateEmail();

      if (authUser.value?.emailVerified) {
        toast({
          title: $t('toast.auth.settings.email.update.title'),
          description: $t('toast.auth.settings.email.update.description')
        });
      } else {
        authUser.value!.email = email;

        toast({
          title: $t('toast.auth.settings.email.update.unverified.title'),
          description: $t(
            'toast.auth.settings.email.update.unverified.description'
          )
        });
      }
    }
  };

  const closeUpdateEmail = () => {
    emit('close-update-email');

    updateEmailForm.resetForm();
  };

  return {
    isLoadingUpdateEmail,
    errorMessageUpdateEmail,
    UpdateEmailSchema,
    updateEmailForm,
    fieldConfig,
    updateEmail,
    closeUpdateEmail
  };
};

import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  USER_USERNAME_MIN,
  USER_USERNAME_MAX
} from '#shared/constants/user.constant';

export const useAuthUpdateUsername = () => {
  const emit = getCurrentInstance()!.emit;

  const { t: $t } = useI18n();

  const { authUser, updateAuthUser } = useAuth();

  const { requiredMessage, minMessage, maxMessage, alreadyUseMessage } =
    useFormMessage();

  const { toast } = useToast();

  const isLoadingUpdateUsername: Ref<boolean> = ref(false);
  const errorMessageUpdateUsername: Ref<string | undefined> = ref(undefined);

  const UpdateUsernameSchema = z.object({
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
  });

  type UsernameForm = z.TypeOf<typeof UpdateUsernameSchema>;

  const validationSchema = toTypedSchema(UpdateUsernameSchema);

  const updateUsernameForm = useForm({
    validationSchema
  });

  const fieldConfig = {
    username: {
      label: $t('form.username'),
      inputProps: {
        type: 'text',
        placeholder: authUser.value?.username || 'skuzow'
      }
    }
  };

  const errorMessageMap: Record<string, string> = {
    USERNAME_IS_INVALID: $t('form.usernameFormat'),
    USERNAME_IS_ALREADY_TAKEN_PLEASE_TRY_ANOTHER: alreadyUseMessage(
      FormInput.USERNAME
    )
  };

  const updateUsername = async ({ username }: UsernameForm) => {
    if (isLoadingUpdateUsername.value) return;

    isLoadingUpdateUsername.value = true;

    const { error } = await updateAuthUser({
      username
    });

    isLoadingUpdateUsername.value = false;

    if (error) {
      errorMessageUpdateUsername.value =
        errorMessageMap[error.code!] || error.message;
    } else {
      closeUpdateUsername();

      toast({
        title: $t('toast.auth.settings.username'),
        description: username
      });
    }
  };

  const closeUpdateUsername = () => {
    emit('close-update-username');

    updateUsernameForm.resetForm();
  };

  return {
    isLoadingUpdateUsername,
    errorMessageUpdateUsername,
    UpdateUsernameSchema,
    updateUsernameForm,
    fieldConfig,
    updateUsername,
    closeUpdateUsername
  };
};

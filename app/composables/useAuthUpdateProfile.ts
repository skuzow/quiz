import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import { USER_NAME_MIN, USER_NAME_MAX } from '#shared/constants/user.constant';

export const useAuthUpdateProfile = () => {
  const emit = getCurrentInstance()!.emit;

  const { t: $t } = useI18n();

  const { authUser, updateAuthUser } = useAuth();

  const { requiredMessage, minMessage, maxMessage } = useFormMessage();

  const { toast } = useToast();

  const isLoadingUpdateProfile: Ref<boolean> = ref(false);
  const errorMessageUpdateProfile: Ref<string | undefined> = ref(undefined);

  const UpdateProfileSchema = z.object({
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
      .trim()
  });

  type UpdateProfileForm = z.TypeOf<typeof UpdateProfileSchema>;

  const validationSchema = toTypedSchema(UpdateProfileSchema);

  const updateProfileForm = useForm({
    validationSchema
  });

  const fieldConfig = {
    name: {
      label: $t('form.name'),
      inputProps: {
        type: 'text',
        placeholder: authUser.value?.name
      }
    }
  };

  const updateProfile = async ({ name }: UpdateProfileForm) => {
    if (isLoadingUpdateProfile.value) return;

    isLoadingUpdateProfile.value = true;

    const { error } = await updateAuthUser({
      name
    });

    isLoadingUpdateProfile.value = false;

    if (error) errorMessageUpdateProfile.value = error.message;
    else {
      closeUpdateProfile();

      toast({
        title: $t('toast.auth.settings.profile'),
        description: name
      });
    }
  };

  const closeUpdateProfile = () => {
    emit('close-update-profile');

    updateProfileForm.resetForm();
  };

  return {
    isLoadingUpdateProfile,
    errorMessageUpdateProfile,
    UpdateProfileSchema,
    updateProfileForm,
    fieldConfig,
    updateProfile,
    closeUpdateProfile
  };
};

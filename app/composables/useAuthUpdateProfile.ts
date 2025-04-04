import { z } from 'zod';
import { toTypedSchema } from '@vee-validate/zod';
import { useForm } from 'vee-validate';

import type { NuxtError } from '#app';

import { useToast } from '@/components/ui/toast/use-toast';

import { FormInput } from '@/constants/form.constant';
import {
  IMAGE_SIZE_MAX_MB,
  IMAGE_SIZE_MAX
} from '#shared/constants/image.constant';
import { USER_NAME_MIN, USER_NAME_MAX } from '#shared/constants/user.constant';

export const useAuthUpdateProfile = () => {
  const emit = getCurrentInstance()!.emit;

  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();

  const { authUser, fetchSession, updateAuthUser } = useAuth();

  const { requiredMessage, minMessage, maxMessage } = useFormMessage();

  const { toast } = useToast();

  const isLoadingUpdateProfile: Ref<boolean> = ref(false);
  const errorMessageUpdateProfile: Ref<string | undefined> = ref(undefined);

  const imageInput = useTemplateRef<HTMLInputElement>('user-image-input');

  const isLoadingUpdateImage: Ref<boolean> = ref(false);

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
        title: $t('toast.auth.settings.profile.title'),
        description: name
      });
    }
  };

  const clickImageInput = () => imageInput.value?.click();

  const updateImage = async (event: Event) => {
    const input = event.target as HTMLInputElement;

    if (!input.files?.length) return;

    const file: File = input.files[0]!;

    if (file.size > IMAGE_SIZE_MAX) {
      return toast({
        title: `${$t('form.image.size')} ${IMAGE_SIZE_MAX_MB} MB`,
        variant: 'destructive'
      });
    }

    const formData = new FormData();
    formData.append('image', file);

    isLoadingUpdateImage.value = true;

    try {
      const response = await $api.user.updateImage(
        authUser.value!.id,
        formData
      );

      authUser.value!.image = response.body.image;

      toast({ title: $t('toast.auth.settings.profile.image.title') });
    } catch (error) {
      toast({
        title: $t('toast.auth.settings.profile.image.error'),
        description: (error as NuxtError).statusMessage,
        variant: 'destructive'
      });
    } finally {
      isLoadingUpdateImage.value = false;
      input.value = '';

      closeUpdateProfile();
    }

    await fetchSession(true);
  };

  const closeUpdateProfile = () => {
    emit('close-update-profile');

    updateProfileForm.resetForm();
  };

  return {
    isLoadingUpdateProfile,
    errorMessageUpdateProfile,
    isLoadingUpdateImage,
    UpdateProfileSchema,
    updateProfileForm,
    fieldConfig,
    updateProfile,
    clickImageInput,
    updateImage,
    closeUpdateProfile
  };
};

import type { NuxtError } from '#app';

import { useToast } from '@/components/ui/toast/use-toast';

import {
  IMAGE_SIZE_MAX_MB,
  IMAGE_SIZE_MAX
} from '#shared/constants/image.constant';

export const useUpdateProfileImage = (user: User) => {
  const { $api } = useNuxtApp();
  const { t: $t } = useI18n();

  const { toast } = useToast();

  const profileImageInput = useTemplateRef<HTMLInputElement>(
    'user-profile-image-input'
  );

  const profileImage: Ref<string> = ref(
    user.profileImage || '/images/profile.avif'
  );

  const isLoadingUpdateProfileImage: Ref<boolean> = ref(false);

  const clickProfileImageInput = () => profileImageInput.value?.click();

  const updateProfileImage = async (event: Event) => {
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

    isLoadingUpdateProfileImage.value = true;

    try {
      const response = await $api.user.updateProfileImage(user.id, formData);

      profileImage.value = response.body.profileImage!;

      toast({ title: $t('toast.users.profile.image.title') });
    } catch (error) {
      toast({
        title: $t('toast.users.profile.image.error'),
        description: (error as NuxtError).statusMessage,
        variant: 'destructive'
      });
    } finally {
      isLoadingUpdateProfileImage.value = false;
      input.value = '';
    }
  };

  return {
    profileImage,
    isLoadingUpdateProfileImage,
    clickProfileImageInput,
    updateProfileImage
  };
};

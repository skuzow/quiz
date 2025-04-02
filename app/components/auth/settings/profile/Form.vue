<script lang="ts" setup>
import { ImageUpIcon } from 'lucide-vue-next';

defineEmits(['close-update-profile']);

const { authUser } = useAuth();

const {
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
} = useAuthUpdateProfile();
</script>

<template>
  <Card>
    <input
      ref="image-input"
      type="file"
      accept="image/*"
      class="hidden"
      @change="updateImage"
    />

    <CardContent class="flex flex-col gap-y-6 pt-6">
      <div class="flex items-center justify-between">
        <CommonAvatar
          size="base"
          :height="64"
          :width="64"
          :pointer="false"
          :user="authUser"
        />

        <Button variant="secondary" class="gap-x-2" @click="clickImageInput">
          <IconLoader v-if="isLoadingUpdateImage" />
          <ImageUpIcon v-else :size="16" />
          {{ $t('form.image.button') }}
        </Button>
      </div>

      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="UpdateProfileSchema"
        :form="updateProfileForm"
        :field-config="fieldConfig"
        @submit="updateProfile"
      >
        <CommonErrorMessage v-if="errorMessageUpdateProfile">
          {{ errorMessageUpdateProfile }}
        </CommonErrorMessage>

        <div class="flex justify-end gap-x-2">
          <Button variant="ghost" @click.prevent="closeUpdateProfile">
            {{ $t('cancel') }}
          </Button>

          <Button type="submit">
            <IconLoader
              v-if="isLoadingUpdateProfile"
              class="mr-2 fill-primary-foreground"
            />
            {{ $t('save') }}
          </Button>
        </div>
      </AutoForm>
    </CardContent>
  </Card>
</template>

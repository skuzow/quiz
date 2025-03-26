<script lang="ts" setup>
defineEmits(['close-update-profile']);

const {
  isLoadingUpdateProfile,
  errorMessageUpdateProfile,
  UpdateProfileSchema,
  updateProfileForm,
  fieldConfig,
  updateProfile,
  closeUpdateProfile
} = useAuthUpdateProfile();
</script>

<template>
  <Card>
    <CardContent class="pt-6">
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
            Cancel
          </Button>

          <Button type="submit">
            <IconLoader
              v-if="isLoadingUpdateProfile"
              class="mr-2 fill-primary-foreground"
            />
            Save changes
          </Button>
        </div>
      </AutoForm>
    </CardContent>
  </Card>
</template>

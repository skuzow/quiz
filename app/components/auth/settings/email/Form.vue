<script lang="ts" setup>
defineEmits(['close-update-email']);

const {
  isLoadingUpdateEmail,
  errorMessageUpdateEmail,
  UpdateEmailSchema,
  updateEmailForm,
  fieldConfig,
  updateEmail,
  closeUpdateEmail
} = useAuthUpdateEmail();
</script>

<template>
  <Card>
    <CardContent class="pt-6">
      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="UpdateEmailSchema"
        :form="updateEmailForm"
        :field-config="fieldConfig"
        @submit="updateEmail"
      >
        <CommonErrorMessage v-if="errorMessageUpdateEmail">
          {{ errorMessageUpdateEmail }}
        </CommonErrorMessage>

        <div class="flex justify-end gap-x-2">
          <Button variant="ghost" @click.prevent="closeUpdateEmail">
            {{ $t('cancel') }}
          </Button>

          <Button type="submit">
            <IconLoader
              v-if="isLoadingUpdateEmail"
              class="mr-2 fill-primary-foreground"
            />
            {{ $t('save') }}
          </Button>
        </div>
      </AutoForm>
    </CardContent>
  </Card>
</template>

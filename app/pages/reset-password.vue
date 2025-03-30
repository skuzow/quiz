<script lang="ts" setup>
definePageMeta({ middleware: ['reset-password'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('resetPassword.title'),
  description: $t('resetPassword.description')
});

const {
  isLoadingResetPassword,
  errorMessageResetPassword,
  ResetPasswordSchema,
  resetPasswordForm,
  fieldConfig,
  resetPassword
} = useResetPassword();
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('resetPassword.title')"
      :description="$t('resetPassword.description')"
    />

    <section class="flex w-72 flex-col gap-y-6">
      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="ResetPasswordSchema"
        :form="resetPasswordForm"
        :field-config="fieldConfig"
        @submit="resetPassword"
      >
        <CommonErrorBagMessages
          :error-bag="resetPasswordForm.errorBag.value"
          error-key=""
        />

        <CommonErrorMessage v-if="errorMessageResetPassword">
          {{ errorMessageResetPassword }}
        </CommonErrorMessage>

        <Button type="submit">
          <IconLoader
            v-if="isLoadingResetPassword"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('resetPassword.button') }}</template>
        </Button>
      </AutoForm>
    </section>
  </div>
</template>

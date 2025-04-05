<script lang="ts" setup>
import { ArrowLeftIcon } from 'lucide-vue-next';

definePageMeta({ middleware: 'auth-login' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('forgotPassword.title'),
  description: $t('forgotPassword.description')
});

const {
  isLoadingForgotPassword,
  errorMessageForgotPassword,
  ForgotPasswordSchema,
  forgotPasswordForm,
  fieldConfig,
  forgotPassword
} = useForgotPassword();
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('forgotPassword.title')"
      :description="$t('forgotPassword.description')"
    />

    <section class="flex w-72 flex-col gap-y-6">
      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="ForgotPasswordSchema"
        :form="forgotPasswordForm"
        :field-config="fieldConfig"
        @submit="forgotPassword"
      >
        <FormErrorMessage v-if="errorMessageForgotPassword">
          {{ errorMessageForgotPassword }}
        </FormErrorMessage>

        <Button type="submit">
          <IconLoader
            v-if="isLoadingForgotPassword"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('forgotPassword.button') }}</template>
        </Button>
      </AutoForm>

      <div class="text-center">
        <NuxtLinkLocale to="/login" :title="$t('nav.footer.contact')">
          <Button variant="link" class="gap-x-1">
            <ArrowLeftIcon :size="16" />
            Back to Log In
          </Button>
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>

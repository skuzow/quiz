<script lang="ts" setup>
definePageMeta({ middleware: ['auth-login'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.login'),
  description: $t('login.description')
});

const {
  isLoadingWithEmail,
  errorMessageWithEmail,
  formSchema,
  fieldConfig,
  loginWithEmail
} = useLoginForm();
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('nav.header.login')"
      :description="$t('login.description')"
    />

    <section class="flex w-72 flex-col gap-y-6">
      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="formSchema"
        :field-config="fieldConfig"
        @submit="loginWithEmail"
      >
        <CommonErrorMessage v-if="errorMessageWithEmail">
          {{ errorMessageWithEmail }}
        </CommonErrorMessage>

        <Button type="submit">
          <IconLoader
            v-if="isLoadingWithEmail"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('nav.header.login') }}</template>
        </Button>
      </AutoForm>

      <Separator :label="$t('auth.or')" />

      <AuthProviderButtons />

      <AuthBottomConnect
        :text="$t('auth.dontHaveAccount')"
        connection="signup"
      />
    </section>
  </div>
</template>

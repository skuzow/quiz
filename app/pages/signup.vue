<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.signup'),
  description: $t('signup.description')
});

const {
  isLoadingWithEmail,
  errorMessageWithEmail,
  formSchema,
  fieldConfig,
  signupWithEmail
} = useSignupForm();
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('nav.header.signup')"
      :description="$t('signup.description')"
    />

    <section class="flex w-72 flex-col gap-y-6">
      <AutoForm
        class="flex flex-col gap-y-6"
        :schema="formSchema"
        :field-config="fieldConfig"
        @submit="signupWithEmail"
      >
        <CommonErrorMessage v-if="errorMessageWithEmail">
          {{ errorMessageWithEmail }}
        </CommonErrorMessage>

        <Button type="submit">
          <IconLoader
            v-if="isLoadingWithEmail"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('nav.header.signup') }}</template>
        </Button>
      </AutoForm>

      <Separator :label="$t('auth.or')" />

      <AuthProviderButtons />

      <AuthBottomConnect
        :text="$t('auth.alreadyHaveAccount')"
        connection="login"
      />
    </section>
  </div>
</template>

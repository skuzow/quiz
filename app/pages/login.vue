<script lang="ts" setup>
definePageMeta({ middleware: 'auth-login' });

const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.login'),
  description: $t('login.description')
});

const {
  isLoadingWithEmail,
  errorMessageWithEmail,
  LoginSchema,
  loginForm,
  fieldConfig,
  loginWithEmail
} = useLogin();
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
        :schema="LoginSchema"
        :form="loginForm"
        :field-config="fieldConfig"
        @submit="loginWithEmail"
      >
        <FormErrorMessage v-if="errorMessageWithEmail">
          {{ errorMessageWithEmail }}
        </FormErrorMessage>

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

      <div>
        <p class="flex items-center justify-center gap-x-2 text-sm">
          <span class="text-muted-foreground">
            {{ $t('login.forgotPassword') }}
          </span>

          <NuxtLinkLocale
            to="/forgot-password"
            :title="$t('forgotPassword.title')"
          >
            <Button variant="link" class="p-0">
              {{ $t('click') }}
            </Button>
          </NuxtLinkLocale>
        </p>

        <AuthBottomConnect
          :text="$t('auth.dontHaveAccount')"
          connection="signup"
        />
      </div>
    </section>
  </div>
</template>

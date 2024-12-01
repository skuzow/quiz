<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

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
  loginWithEmail,
  loginWithGoogle,
  loginWithGithub
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
        <p
          v-if="errorMessageWithEmail"
          class="text-[0.8rem] font-medium text-destructive"
        >
          {{ errorMessageWithEmail }}
        </p>

        <Button type="submit">
          <IconLoader
            v-if="isLoadingWithEmail"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('nav.header.login') }}</template>
        </Button>
      </AutoForm>

      <Separator :label="$t('auth.or')" />

      <Button variant="outline" @click="loginWithGoogle">
        <IconGoogle class="mr-2" />
        {{ $t('auth.google') }}
      </Button>

      <Button variant="outline" @click="loginWithGithub">
        <IconGithub class="mr-2" />
        {{ $t('auth.github') }}
      </Button>
    </section>
  </div>
</template>

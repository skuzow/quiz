<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.signup'),
  description: $t('signup.description')
});

const {
  loading,
  formSchema,
  fieldConfig,
  signupWithEmail,
  signupWithGoogle,
  signupWithGithub
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
        <Button type="submit">
          {{ loading ? 'loading' : $t('nav.header.signup') }}
        </Button>
      </AutoForm>

      <Separator :label="$t('auth.or')" />

      <Button variant="outline" @click="signupWithGoogle">
        <IconGoogle class="mr-2" />
        {{ $t('auth.google') }}
      </Button>

      <Button variant="outline" @click="signupWithGithub">
        <IconGithub class="mr-2" />
        {{ $t('auth.github') }}
      </Button>
    </section>
  </div>
</template>

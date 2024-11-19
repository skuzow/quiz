<script lang="ts" setup>
const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.signup'),
  description: $t('signup.description')
});

const {
  formSchema,
  fieldConfig,
  onSubmitForm,
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
        @submit="onSubmitForm"
      >
        <Button type="submit">{{ $t('nav.header.signup') }}</Button>
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

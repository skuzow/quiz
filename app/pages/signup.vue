<script lang="ts" setup>
const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.signup'),
  description: $t('signup.description')
});

const { formSchema, fieldConfig, onSubmit } = useSignupForm();
</script>

<template>
  <div class="flex flex-col items-center">
    <h1
      class="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-3xl font-bold text-transparent"
    >
      {{ $t('nav.header.signup') }}
    </h1>
    <p class="mt-2">{{ $t('signup.description') }}</p>

    <AutoForm
      class="mt-10 flex w-72 flex-col gap-y-6"
      :schema="formSchema"
      :field-config="fieldConfig"
      @submit="onSubmit"
    >
      <Button type="submit">{{ $t('nav.header.signup') }}</Button>
    </AutoForm>
  </div>
</template>

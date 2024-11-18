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
    <CommonTitle
      :title="$t('nav.header.signup')"
      :description="$t('signup.description')"
    />

    <AutoForm
      class="flex w-72 flex-col gap-y-6"
      :schema="formSchema"
      :field-config="fieldConfig"
      @submit="onSubmit"
    >
      <Button type="submit">{{ $t('nav.header.signup') }}</Button>
    </AutoForm>
  </div>
</template>

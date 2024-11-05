<script lang="ts" setup>
const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.login'),
  description: $t('login.description')
});

const { formSchema, fieldConfig, onSubmit } = useLoginForm();
</script>

<template>
  <div class="flex flex-col items-center">
    <CommonTitle
      :title="$t('nav.header.login')"
      :description="$t('login.description')"
    />

    <AutoForm
      class="flex w-72 flex-col gap-y-6"
      :schema="formSchema"
      :field-config="fieldConfig"
      @submit="onSubmit"
    >
      <Button type="submit">{{ $t('nav.header.login') }}</Button>
    </AutoForm>
  </div>
</template>

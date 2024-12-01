<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

const { t: $t } = useI18n();

seoMeta({
  title: $t('nav.header.signup'),
  description: $t('signup.description')
});

const {
  isLoadingWithEmail,
  isLoadingWithGoogle,
  isLoadingWithGithub,
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
          <IconLoader
            v-if="isLoadingWithEmail"
            class="fill-primary-foreground"
          />
          <template v-else>{{ $t('nav.header.signup') }}</template>
        </Button>
      </AutoForm>

      <Separator :label="$t('auth.or')" />

      <Button variant="outline" @click="signupWithGoogle">
        <IconLoader v-if="isLoadingWithGoogle" class="mr-2" />
        <IconGoogle v-else class="mr-2" />
        {{ $t('auth.google') }}
      </Button>

      <Button variant="outline" @click="signupWithGithub">
        <IconLoader v-if="isLoadingWithGithub" class="mr-2" />
        <IconGithub v-else class="mr-2" />
        {{ $t('auth.github') }}
      </Button>
    </section>
  </div>
</template>

<script lang="ts" setup>
seoMeta({
  title: 'Sign Up',
  description: 'Sign up for an account to access exclusive features.'
});

const { formSchema, fieldConfig, onSubmit } = useSignupForm();
</script>

<template>
  <div class="flex flex-col items-center">
    <h1
      class="bg-gradient-to-r from-gradient-start to-gradient-end bg-clip-text text-3xl font-bold text-transparent"
    >
      Sign Up
    </h1>
    <p class="mt-2">Enter your information to sign up.</p>

    <AutoForm
      class="mt-10 flex w-72 flex-col gap-y-6"
      :schema="formSchema"
      :field-config="fieldConfig"
      @submit="onSubmit"
    >
      <Button type="submit">Sign Up</Button>
    </AutoForm>
  </div>
</template>

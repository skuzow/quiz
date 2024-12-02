<script lang="ts" setup>
const {
  isLoadingWithGoogle,
  isLoadingWithGithub,
  loginWithGoogle,
  loginWithGithub
} = useAuthProviders();
</script>

<template>
  <Button variant="outline" @click="loginWithGoogle">
    <IconLoader v-if="isLoadingWithGoogle" class="mr-2" />
    <IconGoogle v-else class="mr-2" />
    {{ $t('auth.google') }}
  </Button>

  <Button variant="outline" @click="loginWithGithub">
    <IconLoader v-if="isLoadingWithGithub" class="mr-2" />
    <IconGithub v-else class="mr-2" />
    {{ $t('auth.github') }}
  </Button>
</template>

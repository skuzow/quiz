<script lang="ts" setup>
const { isAuthenticated } = useAuth();

const { isOpen } = useAuthSettings();
</script>

<template>
  <Dialog v-if="isAuthenticated" v-model:open="isOpen">
    <AuthSettingsContent />
  </Dialog>
</template>

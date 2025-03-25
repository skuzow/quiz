<script lang="ts" setup>
const { isAuthenticated } = useAuth();

const { isOpen } = useAuthSettings();
</script>

<template>
  <Dialog v-if="isAuthenticated" v-model:open="isOpen">
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>This is the settings dialog.</DialogDescription>
      </DialogHeader>

      <span>Settings content</span>
    </DialogContent>
  </Dialog>
</template>

<script lang="ts" setup>
import { Settings2Icon } from 'lucide-vue-next';
</script>

<template>
  <DialogContent>
    <DialogHeader>
      <DialogTitle class="flex items-center gap-x-2.5">
        <Settings2Icon :size="20" />
        {{ $t('nav.header.user.settings') }}
      </DialogTitle>
    </DialogHeader>

    <Separator />

    <div class="flex flex-col gap-y-4 text-sm">
      <AuthSettingsProfile />

      <AuthSettingsUsername />

      <!-- <AuthSettingsEmail /> -->

      <AuthSettingsAccountDelete />
    </div>
  </DialogContent>
</template>

<script lang="ts" setup>
import { Settings2Icon } from 'lucide-vue-next';
</script>

<template>
  <DialogContent class="max-h-[90dvh] p-0">
    <DialogHeader class="p-6 pb-0">
      <DialogTitle class="flex items-center gap-x-2.5">
        <Settings2Icon :size="20" />
        {{ $t('nav.header.user.settings') }}
      </DialogTitle>
    </DialogHeader>

    <Separator />

    <div
      class="flex max-h-[75dvh] flex-col gap-y-4 overflow-y-auto p-6 pt-0 text-sm"
    >
      <AuthSettingsProfile />

      <AuthSettingsUsername />

      <!-- <AuthSettingsEmail /> -->

      <AuthSettingsSessions />

      <AuthSettingsAccountDelete />
    </div>
  </DialogContent>
</template>

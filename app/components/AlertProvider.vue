<script lang="ts" setup>
const { t: $t } = useI18n();

const { isOpen, options, dismiss } = useAlert();
</script>

<template>
  <AlertDialog v-model:open="isOpen">
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>{{ options?.title }}</AlertDialogTitle>
        <AlertDialogDescription>
          {{ options?.description }}
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel @click="dismiss(false)">
          {{ options?.cancel || $t('cancel') }}
        </AlertDialogCancel>
        <AlertDialogAction @click="dismiss(true)">
          {{ options?.confirm || $t('confirm') }}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
</template>

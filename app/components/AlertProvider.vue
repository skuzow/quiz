<script lang="ts" setup>
import { useMediaQuery } from '@vueuse/core';

const { isOpen, options, dismiss } = useAlert();

const isDesktop: Ref<boolean> = useMediaQuery('(min-width: 768px)');
</script>

<template>
  <AlertDialog v-if="isDesktop" v-model:open="isOpen">
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

  <Drawer v-else v-model:open="isOpen" :dismissible="false">
    <DrawerContent>
      <DrawerHeader class="mt-3 gap-3">
        <DrawerTitle>{{ options?.title }}</DrawerTitle>

        <DrawerDescription>
          {{ options?.description }}
        </DrawerDescription>
      </DrawerHeader>
      <DrawerFooter class="mb-6">
        <DrawerClose as-child>
          <Button @click="dismiss(true)">
            {{ options?.confirm || $t('confirm') }}
          </Button>
        </DrawerClose>

        <DrawerClose as-child>
          <Button variant="outline" @click="dismiss(false)">
            {{ options?.cancel || $t('cancel') }}
          </Button>
        </DrawerClose>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>
</template>

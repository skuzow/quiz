<script lang="ts" setup>
interface Props {
  navMenuTitle: string;
  navMenuItems: NavMenuItem[];
}

const { navMenuTitle, navMenuItems } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h3 class="text-sm font-bold">{{ navMenuTitle }}</h3>

    <SheetMenuContentItems :nav-menu-items="navMenuItems" />
  </div>
</template>

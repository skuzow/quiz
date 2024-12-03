<script lang="ts" setup>
interface Props {
  itemValue: string;
  navMenuTitle: string;
  navMenuItems: NavMenuItem[];
}

const { navMenuTitle, navMenuItems } = defineProps<Props>();
</script>

<template>
  <AccordionItem :value="itemValue">
    <AccordionTrigger>
      <h3 class="font-bold">{{ navMenuTitle }}</h3>
    </AccordionTrigger>
    <AccordionContent>
      <SheetMenuContentItems :nav-menu-items="navMenuItems" />
    </AccordionContent>
  </AccordionItem>
</template>

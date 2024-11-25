<script lang="ts" setup>
interface Props {
  navMenuTitle: string;
  navMenuItems: NavMenuItem[];
}

const { navMenuTitle, navMenuItems } = defineProps<Props>();
</script>

<template>
  <Accordion type="single" collapsible>
    <AccordionItem value="item-1">
      <AccordionTrigger>
        <h3 class="font-bold">{{ navMenuTitle }}</h3>
      </AccordionTrigger>
      <AccordionContent>
        <SheetMenuContentItems :nav-menu-items="navMenuItems" />
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>

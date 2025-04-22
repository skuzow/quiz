<script lang="ts" setup>
interface Props {
  class?: string;
}

const { class: className } = defineProps<Props>();
</script>

<template>
  <Card
    :class="
      cn(
        'transition-all duration-200 hover:-translate-y-0.5 hover:bg-secondary/50 hover:shadow-md',
        className
      )
    "
  >
    <slot />
  </Card>
</template>

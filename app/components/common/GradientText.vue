<script lang="ts" setup>
interface Props {
  class?: string;
}

const { class: className = 'bg-gradient-to-r' } = defineProps<Props>();
</script>

<template>
  <span
    :class="
      cn(
        'from-gradient-start to-gradient-end bg-clip-text text-transparent',
        className
      )
    "
  >
    <slot />
  </span>
</template>

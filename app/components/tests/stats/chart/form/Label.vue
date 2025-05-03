<script lang="ts" setup>
interface Props {
  id: string;
  title: string;
  label: string;
}

const { id, title, label } = defineProps<Props>();
</script>

<template>
  <label :for="id">
    <h2 class="text-lg font-semibold">
      <CommonGradientText direction="bottomTop">
        {{ title }}
      </CommonGradientText>
    </h2>

    <p class="sr-only text-sm md:not-sr-only">
      {{ label }}
    </p>
  </label>
</template>

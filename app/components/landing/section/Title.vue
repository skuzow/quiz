<script lang="ts" setup>
interface Props {
  title: string;
  description: string;
}

const { title, description } = defineProps<Props>();
</script>

<template>
  <div class="mb-16 space-y-4 text-center">
    <h2 class="text-3xl font-bold md:text-4xl">
      <CommonGradientText direction="bottomTop">
        {{ title }}
      </CommonGradientText>
    </h2>
    <p class="text-lg">{{ description }}</p>
  </div>
</template>

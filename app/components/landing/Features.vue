<script lang="ts" setup>
import { CircleCheckBig, BrainIcon, ClockIcon } from 'lucide-vue-next';

const features = [
  {
    icon: CircleCheckBig,
    title: 'Easy Creation',
    description: 'Intuitive interface for quick test creation'
  },
  {
    icon: BrainIcon,
    title: 'AI-Powered',
    description: 'Generate tests with advanced AI technology'
  },
  {
    icon: ClockIcon,
    title: 'Time-Saving',
    description:
      'Streamline your test creation process with our fast-forward forms'
  }
];
</script>

<template>
  <section class="flex flex-col items-center gap-y-16">
    <div class="space-y-4 text-center">
      <h2 class="text-3xl font-bold md:text-4xl">Powerful Creation Features</h2>
      <p class="text-lg">Everything you need to power your tests</p>
    </div>

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <Card
        v-for="{ icon, title, description } in features"
        :key="title"
        class="flex flex-col items-center p-8 text-center"
      >
        <component :is="icon" :size="54" stroke="url(#gradient-svg)" />
        <h3 class="mt-5 text-lg font-semibold">{{ title }}</h3>
        <p class="mt-2">{{ description }}</p>
      </Card>
    </div>
  </section>
</template>

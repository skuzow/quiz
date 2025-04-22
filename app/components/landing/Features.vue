<script lang="ts" setup>
import { CircleCheckBig, BrainIcon, ClockFadingIcon } from 'lucide-vue-next';

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
    icon: ClockFadingIcon,
    title: 'Time-Saving',
    description:
      'Streamline your test creation process with our fast-forward forms'
  }
];
</script>

<template>
  <section>
    <LandingSectionTitle
      title="Powerful Creation Features"
      description="Everything you need to power your tests"
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <CommonCard
        v-for="{ icon, title, description } in features"
        :key="title"
        class="flex flex-col items-center p-8 text-center"
      >
        <component :is="icon" :size="54" stroke="url(#gradient-svg)" />
        <h3 class="mt-5 text-lg font-semibold">{{ title }}</h3>
        <p class="mt-2">{{ description }}</p>
      </CommonCard>
    </div>
  </section>
</template>

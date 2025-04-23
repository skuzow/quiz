<script lang="ts" setup>
import { CircleCheckBig, BrainIcon, ClockFadingIcon } from 'lucide-vue-next';

const { t: $t } = useI18n();

const keys = [
  {
    icon: CircleCheckBig,
    title: $t('landing.keys.cards.easy.title'),
    description: $t('landing.keys.cards.easy.description')
  },
  {
    icon: BrainIcon,
    title: $t('landing.keys.cards.aiPowered.title'),
    description: $t('landing.keys.cards.aiPowered.description')
  },
  {
    icon: ClockFadingIcon,
    title: $t('landing.keys.cards.timeSaving.title'),
    description: $t('landing.keys.cards.timeSaving.description')
  }
];
</script>

<template>
  <section>
    <LandingSectionTitle
      :title="$t('landing.keys.title')"
      :description="$t('landing.keys.description')"
    />

    <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
      <CommonCard
        v-for="{ icon, title, description } in keys"
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

<script lang="ts" setup>
import { ArrowUpRightIcon, SparkleIcon } from 'lucide-vue-next';
</script>

<template>
  <section class="flex flex-col items-center text-center">
    <h1 class="mb-5 text-5xl font-extrabold md:mb-8 md:max-w-3xl md:text-7xl">
      <CommonGradientText>
        {{ $t('landing.hero.title.gradient') }}
      </CommonGradientText>
      {{ $t('landing.hero.title.normal') }}
    </h1>

    <p class="mb-7 text-pretty text-xl md:mb-9 md:max-w-xl">
      {{ $t('description') }}
    </p>

    <div class="flex gap-x-4">
      <NuxtLinkLocale to="/tests" :title="$t('landing.hero.buttons.start')">
        <Button class="gap-x-2">
          {{ $t('landing.hero.buttons.start') }}
          <ArrowUpRightIcon :size="16" />
        </Button>
      </NuxtLinkLocale>

      <NuxtLinkLocale to="/generate" :title="$t('landing.hero.buttons.ai')">
        <Button variant="secondary" class="gap-x-2">
          {{ $t('landing.hero.buttons.ai') }}
          <SparkleIcon :size="16" stroke="url(#gradient-svg)" />
        </Button>
      </NuxtLinkLocale>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ArrowUpRightIcon, SparkleIcon } from 'lucide-vue-next';

seoMeta();
</script>

<template>
  <div class="mt-6 space-y-20 md:mt-10 md:space-y-48">
    <section class="flex flex-col items-center text-center">
      <h1 class="mb-5 text-5xl font-extrabold md:mb-8 md:max-w-3xl md:text-7xl">
        <CommonGradientText>
          {{ $t('landing.title.gradient') }}
        </CommonGradientText>
        {{ $t('landing.title.normal') }}
      </h1>

      <p class="mb-7 text-pretty text-lg md:mb-9 md:max-w-xl md:text-xl">
        {{ $t('description') }}
      </p>

      <div class="flex gap-x-4">
        <NuxtLinkLocale to="/tests" :title="$t('landing.buttons.start')">
          <Button class="gap-x-2">
            {{ $t('landing.buttons.start') }}
            <ArrowUpRightIcon :size="16" />
          </Button>
        </NuxtLinkLocale>

        <NuxtLinkLocale to="/generate" :title="$t('landing.buttons.ai')">
          <Button variant="secondary" class="gap-x-2">
            {{ $t('landing.buttons.ai') }}
            <SparkleIcon :size="16" stroke="url(#gradient-svg)" />
          </Button>
        </NuxtLinkLocale>
      </div>
    </section>

    <LandingFaq />
  </div>
</template>

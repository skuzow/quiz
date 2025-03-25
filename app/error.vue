<script lang="ts" setup>
import type { NuxtError } from '#app';

interface Props {
  error: NuxtError;
}

const { error } = defineProps<Props>();

seoMeta({
  title: String(error.statusCode),
  description: error.message
});
</script>

<template>
  <GradientSVG />
  <AuthSettings />

  <NuxtLayout>
    <section class="flex flex-col items-center gap-y-10">
      <NavLogo :size="240" class="rotate-90 md:size-80" />

      <div>
        <h1 class="mb-1 flex justify-center text-4xl font-semibold">
          ERROR {{ error.statusCode }}
        </h1>

        <p class="mb-10">
          {{ error.statusMessage }}
        </p>

        <NuxtLinkLocale to="/">
          <Button class="w-full">
            {{ $t('nav.home') }}
          </Button>
        </NuxtLinkLocale>
      </div>
    </section>
  </NuxtLayout>
</template>

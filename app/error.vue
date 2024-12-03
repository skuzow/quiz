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

const localePath = useLocalePath();
</script>

<template>
  <GradientSVG />

  <NuxtLayout>
    <section class="flex flex-col items-center gap-y-10">
      <NavLogo :size="240" class="rotate-90 md:size-80" />

      <div>
        <h1 class="mb-1 flex justify-center text-4xl font-semibold">
          ERROR {{ error.statusCode }}
        </h1>

        <p class="mb-10">
          {{ error.message }}
        </p>

        <NuxtLink :to="localePath('/')">
          <Button class="w-full">
            {{ $t('nav.home') }}
          </Button>
        </NuxtLink>
      </div>
    </section>
  </NuxtLayout>
</template>

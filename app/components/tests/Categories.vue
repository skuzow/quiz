<script lang="ts" setup>
import type { TestCategory } from '#shared/constants/test.constant';

interface Props {
  categories: TestCategory[];
  class?: string;
}

const { categories, class: className } = defineProps<Props>();
</script>

<template>
  <ul :class="cn('flex gap-x-2', className)">
    <li v-for="(category, indexCategory) in categories" :key="indexCategory">
      <NuxtLinkLocale
        :to="{ path: '/tests', query: { filter: category } }"
        :title="$t(`categories.${category}`)"
        class="flex items-center"
      >
        <Badge>{{ $t(`categories.${category}`) }}</Badge>
      </NuxtLinkLocale>
    </li>
  </ul>
</template>

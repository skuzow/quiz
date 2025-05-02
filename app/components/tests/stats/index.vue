<script lang="ts" setup>
import { ArrowLeftIcon } from 'lucide-vue-next';

interface Props {
  test: UserTestStats;
}

const { test } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-8">
    <NuxtLinkLocale :to="`/tests/${test.id}`" :title="test.title">
      <Button variant="secondary" class="w-fit gap-x-2">
        <ArrowLeftIcon :size="16" />
        Back to test
      </Button>
    </NuxtLinkLocale>

    <TestsInfo :test="test" />

    <TestsStatsChartPassedFailed :stats="test.stats" />
  </div>
</template>

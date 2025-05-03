<script lang="ts" setup>
import { Chart } from '@/constants/chart.constant';

interface Props {
  stats: UserTestCompleted[];
}

const { stats } = defineProps<Props>();

const { options, selected, current } = useChart(Chart.PASSEDFAILED, stats);
</script>

<template>
  <section class="space-y-4">
    <div
      class="flex flex-col gap-y-2 md:flex-row md:items-center md:justify-between md:gap-y-0"
    >
      <label for="passed-failed-select">
        <h2 class="text-lg font-semibold">
          <CommonGradientText direction="bottomTop">
            {{ $t('tests.stats.categories.passed') }} -
            {{ $t('tests.stats.categories.failed') }}
          </CommonGradientText>
        </h2>

        <p class="sr-only text-sm md:not-sr-only">
          {{ current.label }}
        </p>
      </label>

      <Select
        id="passed-failed-select"
        :model-value="selected"
        @update:model-value="(value) => (selected = value)"
      >
        <SelectTrigger class="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem
              v-for="{ key, label } in options"
              :key="key"
              :value="key"
            >
              {{ label }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>

    <AreaChart
      :data="current.data"
      index="name"
      :categories="['passed', 'failed']"
    />
  </section>
</template>

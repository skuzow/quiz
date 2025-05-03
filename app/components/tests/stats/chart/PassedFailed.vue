<script lang="ts" setup>
import { Chart, type ChartKey } from '@/constants/chart.constant';

interface Props {
  stats: UserTestCompleted[];
}

const { stats } = defineProps<Props>();

const { options, selected, current, updateSelected } = useChart(
  Chart.PASSEDFAILED,
  stats
);

const selectId: string = 'passed-failed-select';
</script>

<template>
  <section class="space-y-4">
    <TestsStatsChartFormWrapper>
      <TestsStatsChartFormLabel
        :id="selectId"
        :title="`${$t('tests.stats.categories.passed')} - ${$t('tests.stats.categories.failed')}`"
        :label="current.label"
      />

      <Select
        :id="selectId"
        :model-value="selected"
        @update:model-value="
          (value: string) => updateSelected(value as ChartKey)
        "
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
    </TestsStatsChartFormWrapper>

    <AreaChart
      :data="current.data"
      index="name"
      :categories="['passed', 'failed']"
    />
  </section>
</template>

<script lang="ts" setup>
import {
  format,
  subHours,
  subMonths,
  subYears,
  addHours,
  addDays,
  addMonths,
  closestTo
} from 'date-fns';

interface Props {
  stats: UserTestCompleted[];
}

const { stats } = defineProps<Props>();

const { t: $t } = useI18n();

interface Group {
  date: Date;
  name: string;
  passed: number;
  failed: number;
}

type Unit = 'hour' | 'day' | 'month';

const groupStats = (
  stats: UserTestStats['stats'],
  start: Date,
  unit: Unit,
  length: number,
  formatStr: string
) => {
  const groups: Group[] = Array.from({ length }, (_, index) => {
    const date: Date = formatLabel(unit, start, index);

    return { date, name: format(date, formatStr), passed: 0, failed: 0 };
  });

  const dates: Date[] = groups.map(({ date }) => date);

  stats.forEach(({ score, completedAt }) => {
    const completedAtDate = new Date(completedAt);

    if (completedAtDate < start) return;

    const name: string = format(completedAtDate, formatStr);
    let group: Group | undefined = findGroup(groups, name);

    if (!group && unit === 'hour')
      group = findClosestGroup(groups, dates, completedAtDate);

    if (!group) return;

    if (score >= 5) group.passed++;
    else group.failed++;
  });

  return groups.map((group) => ({
    name: group.name,
    passed: group.passed,
    failed: group.failed
  }));
};

const labelFormaters: Record<Unit, (start: Date, index: number) => Date> = {
  hour: (start, index) => addHours(start, index),
  day: (start, index) => addDays(start, index),
  month: (start, index) => addMonths(start, index)
};

const formatLabel = (unit: Unit, start: Date, index: number) => {
  return labelFormaters[unit](start, index);
};

const findGroup = (groups: Group[], name: string): Group | undefined => {
  return groups.find((group) => group.name === name);
};

const findClosestGroup = (
  groups: Group[],
  dates: Date[],
  date: Date
): Group | undefined => {
  const closestDate: Date | undefined = closestTo(date, dates);

  if (!closestDate) return;

  return groups.find(({ date }) => date.getTime() === closestDate.getTime());
};

enum StatKey {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year'
}

const now = Date.now();

const options = [
  {
    key: StatKey.DAY,
    label: $t('tests.stats.labels.day'),
    data: groupStats(stats, subHours(now, 23), 'hour', 24, 'HH:mm')
  },
  {
    key: StatKey.MONTH,
    label: $t('tests.stats.labels.month'),
    data: groupStats(stats, subMonths(now, 1), 'day', 31, 'MMM d')
  },
  {
    key: StatKey.YEAR,
    label: $t('tests.stats.labels.year'),
    data: groupStats(stats, subYears(now, 1), 'month', 13, 'MMM yyyy')
  }
];

const selected: Ref<string> = ref(StatKey.DAY);

const current = computed(() => {
  const option = options.find(({ key }) => key === selected.value)!;

  return { label: option.label, data: option.data };
});
</script>

<template>
  <section class="space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-xl font-semibold">{{ current.label }}</h2>

      <Select
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

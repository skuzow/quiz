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

import type { ChartGroup, ChartOption } from '@/types/chart.type';
import { Chart, ChartKey, ChartUnit } from '@/constants/chart.constant';

const groupInits: Record<Chart, (date: Date, name: string) => ChartGroup> = {
  [Chart.COMPLETED]: (date, name) => ({
    date,
    name,
    completed: 0
  }),
  [Chart.PASSEDFAILED]: (date, name) => ({
    date,
    name,
    passed: 0,
    failed: 0
  })
};

const groupEnters: Record<
  Chart,
  (group: ChartGroup, stat: UserTestCompleted) => ChartGroup
> = {
  [Chart.COMPLETED]: (group) => {
    if ('completed' in group) group.completed++;

    return group;
  },
  [Chart.PASSEDFAILED]: (group, stat) => {
    if ('passed' in group && 'failed' in group) {
      if (stat.score > 5) group.passed++;
      else group.failed++;
    }

    return group;
  }
};

export const useChart = (chart: Chart, stats: UserTestCompleted[]) => {
  const { t: $t } = useI18n();

  const groupStats = (
    stats: UserTestCompleted[],
    start: Date,
    unit: ChartUnit,
    length: number,
    formatStr: string
  ) => {
    const groups = initGroups(start, unit, length, formatStr);

    const dates: Date[] = groups.map(({ date }) => date);

    stats.forEach((stat) => {
      const completedAtDate = new Date(stat.completedAt);

      if (completedAtDate < start) return;

      const name: string = format(completedAtDate, formatStr);
      let group: ChartGroup | undefined = findGroup(groups, name);

      if (!group && unit === 'hour')
        group = findClosestGroup(groups, dates, completedAtDate);

      if (!group) return;

      group = groupEnters[chart](group, stat);
    });

    return groups.map((group) => ({
      ...group,
      date: undefined
    }));
  };

  const initGroups = (
    start: Date,
    unit: ChartUnit,
    length: number,
    formatStr: string
  ) => {
    return Array.from({ length }, (_, index) => {
      const date: Date = formatLabel(unit, start, index);

      return groupInits[chart](date, format(date, formatStr));
    });
  };

  const labelFormaters: Record<
    ChartUnit,
    (start: Date, index: number) => Date
  > = {
    hour: addHours,
    day: addDays,
    month: addMonths
  };

  const formatLabel = (unit: ChartUnit, start: Date, index: number) => {
    return labelFormaters[unit](start, index);
  };

  const findGroup = (
    groups: ChartGroup[],
    name: string
  ): ChartGroup | undefined => {
    return groups.find((group) => group.name === name);
  };

  const findClosestGroup = (
    groups: ChartGroup[],
    dates: Date[],
    date: Date
  ): ChartGroup | undefined => {
    const closestDate: Date | undefined = closestTo(date, dates);

    if (!closestDate) return;

    return groups.find(({ date }) => date.getTime() === closestDate.getTime());
  };

  const now: number = Date.now();

  const options: ChartOption[] = [
    {
      key: ChartKey.DAY,
      label: $t('tests.stats.labels.day'),
      data: groupStats(stats, subHours(now, 23), ChartUnit.HOUR, 24, 'HH:mm')
    },
    {
      key: ChartKey.MONTH,
      label: $t('tests.stats.labels.month'),
      data: groupStats(stats, subMonths(now, 1), ChartUnit.DAY, 31, 'MMM d')
    },
    {
      key: ChartKey.YEAR,
      label: $t('tests.stats.labels.year'),
      data: groupStats(stats, subYears(now, 1), ChartUnit.MONTH, 13, 'MMM yyyy')
    }
  ];

  const selected: Ref<string> = ref(ChartKey.DAY);

  const current = computed(() => {
    const option = options.find(({ key }) => key === selected.value)!;

    return { label: option.label, data: option.data };
  });

  return {
    options,
    selected,
    current
  };
};

import type { ChartKey } from '@/constants/chart.constant';

interface ChartGroupCompleted {
  date: Date;
  name: string;
  completed: number;
}

interface ChartGroupPassedFailed {
  date: Date;
  name: string;
  passed: number;
  failed: number;
}

export type ChartGroup = ChartGroupCompleted | ChartGroupPassedFailed;

export interface ChartOption {
  key: ChartKey;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any;
}

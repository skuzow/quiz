/* eslint-disable @typescript-eslint/no-explicit-any */
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
  data: any;
}

export interface ChartCurrent {
  label: string;
  data: any;
}

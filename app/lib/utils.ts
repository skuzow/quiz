import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useWindowScroll } from '@vueuse/core';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const scrollTop = () => {
  const { y } = useWindowScroll({ behavior: 'smooth' });

  y.value = 0;
};

export const isValidEmail = (email: string): boolean => {
  const EMAIL_PATTERN: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return EMAIL_PATTERN.test(email);
};

export const abbreviate = (value: string): string => {
  return value.slice(0, 2).toLocaleUpperCase();
};

export const titleCase = (value: string): string => {
  return value[0]?.toUpperCase() + value.substring(1).toLowerCase();
};

export const convertPartialDeepToPlain = <T>(obj: Partial<T>): T => {
  return JSON.parse(JSON.stringify(obj));
};

export const roundToTwo = (value: number): number => {
  return Math.round(value * 100) / 100;
};

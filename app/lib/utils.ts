import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const isValidEmail = (email: string): boolean => {
  const EMAIL_PATTERN: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return EMAIL_PATTERN.test(email);
};

export const clearPasswordInput = () => {
  (document.querySelector('input[name="password"]') as HTMLInputElement).value =
    '';
};

export const abbreviate = (value: string): string => {
  return value.slice(0, 2).toLocaleUpperCase();
};

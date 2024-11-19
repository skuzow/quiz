import { cva, type VariantProps } from 'class-variance-authority';

export const iconVariants = cva('', {
  variants: {
    size: {
      default: 16,
      sm: 14,
      xs: 12
    }
  },
  defaultVariants: {
    size: 'default'
  }
});

export type IconVariants = VariantProps<typeof iconVariants>;

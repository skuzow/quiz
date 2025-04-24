import { cva, type VariantProps } from 'class-variance-authority';

export const gradientVariants = cva('', {
  variants: {
    direction: {
      default: 'bg-gradient-to-r',
      bottomTop: 'bg-gradient-to-b dark:bg-gradient-to-t'
    }
  },
  defaultVariants: {
    direction: 'default'
  }
});

export type GradientVariants = VariantProps<typeof gradientVariants>;

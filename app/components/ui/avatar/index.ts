import { cva, type VariantProps } from 'class-variance-authority';

export { default as Avatar } from './Avatar.vue';
export { default as AvatarFallback } from './AvatarFallback.vue';
export { default as AvatarImage } from './AvatarImage.vue';

export const avatarVariant = cva(
  'inline-flex items-center justify-center font-medium text-foreground select-none shrink-0 bg-secondary overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-9 w-9 text-base',
        sm: 'h-10 w-10 text-lg',
        base: 'h-16 w-16 text-2xl',
        lg: 'h-24 w-24 text-5xl',
        xl: 'h-32 w-32 text-6xl'
      },
      shape: {
        circle: 'rounded-full',
        square: 'rounded-md'
      }
    }
  }
);

export type AvatarVariants = VariantProps<typeof avatarVariant>;

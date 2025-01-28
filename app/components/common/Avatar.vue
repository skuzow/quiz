<script lang="ts" setup>
import type { AvatarVariants } from '@/components/ui/avatar';

interface Props {
  size?: AvatarVariants['size'];
  shape?: AvatarVariants['shape'];
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  alt?: string;
}

const {
  size,
  shape,
  width = 36,
  height = 36,
  loading,
  alt = 'Avatar'
} = defineProps<Props>();

const { user, nameAbbreviation } = useAuth();
</script>

<template>
  <Avatar :size="size" :shape="shape" class="cursor-pointer">
    <AvatarImage
      v-if="user?.image"
      :src="user?.image"
      :width="width"
      :height="height"
      :loading="loading"
      :title="alt"
      :alt="alt"
    />

    <AvatarFallback>
      {{ nameAbbreviation }}
    </AvatarFallback>
  </Avatar>
</template>

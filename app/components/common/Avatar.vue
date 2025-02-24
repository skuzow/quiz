<script lang="ts" setup>
import type { AvatarVariants } from '@/components/ui/avatar';

interface Props {
  size?: AvatarVariants['size'];
  shape?: AvatarVariants['shape'];
  height?: number;
  width?: number;
  loading?: 'lazy' | 'eager';
  alt?: string;
  user: UserPartial;
}

const {
  size,
  shape,
  height = 36,
  width = 36,
  loading,
  alt = 'Avatar',
  user
} = defineProps<Props>();
</script>

<template>
  <Avatar :size="size" :shape="shape" :user="user" class="cursor-pointer">
    <AvatarImage
      v-if="user?.image"
      :src="user?.image"
      :height="height"
      :width="width"
      :loading="loading"
      :title="alt"
      :alt="alt"
    />

    <AvatarFallback v-else>
      {{ abbreviate(user?.username || user.name) }}
    </AvatarFallback>
  </Avatar>
</template>

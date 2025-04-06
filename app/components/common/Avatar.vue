<script lang="ts" setup>
import type { AvatarVariants } from '@/components/ui/avatar';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { authUser } = useAuth();

interface Props {
  size?: AvatarVariants['size'];
  shape?: AvatarVariants['shape'];
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  alt?: string;
  pointer?: boolean;
  user: UserPartial | User | typeof authUser.value;
}

const {
  size,
  shape,
  width = 36,
  height = 36,
  loading,
  alt = 'Avatar',
  pointer = true,
  user
} = defineProps<Props>();
</script>

<template>
  <Avatar
    :size="size"
    :shape="shape"
    :user="user"
    :class="
      cn(
        pointer && 'cursor-pointer',
        pointer &&
          !user?.image &&
          'transition-all duration-200 hover:brightness-95 dark:hover:brightness-110'
      )
    "
  >
    <AvatarImage
      v-if="user?.image"
      :src="user?.image"
      :width="width"
      :height="height"
      :loading="loading"
      :title="alt"
      :alt="alt"
    />

    <AvatarFallback v-else>
      {{ abbreviate(user?.username || user!.name) }}
    </AvatarFallback>
  </Avatar>
</template>

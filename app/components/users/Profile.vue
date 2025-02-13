<script lang="ts" setup>
import { Settings2Icon } from 'lucide-vue-next';

interface Props {
  user: IUser;
}

const { user } = defineProps<Props>();

const { isAuthenticated, user: authUser } = useAuth();

const tempRoles = ['User'];
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <CommonTopImage src="/images/profile.avif" alt="User background image">
      <CommonAvatar
        size="lg"
        :height="96"
        :width="96"
        loading="lazy"
        :user="user as IUserPartial"
        class="absolute bottom-2 left-2"
      />

      <Button
        v-if="isAuthenticated && authUser?.id === user.id"
        class="absolute bottom-2 right-2 gap-x-2"
      >
        <Settings2Icon :size="16" />
        {{ $t('nav.header.user.settings') }}
      </Button>
    </CommonTopImage>

    <div class="flex flex-col gap-y-2">
      <h1 class="flex flex-col overflow-hidden text-ellipsis">
        <CommonGradientText class="bg-gradient-to-b text-2xl font-bold">
          {{ user.name }}
        </CommonGradientText>

        <span v-if="user.username">{{ user.username }}</span>
      </h1>

      <ul class="flex gap-x-2">
        <li v-for="(role, index) in tempRoles" :key="index">
          <Badge>{{ role }}</Badge>
        </li>
      </ul>
    </div>
  </div>
</template>

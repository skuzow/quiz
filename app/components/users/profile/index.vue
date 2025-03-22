<script lang="ts" setup>
import { Settings2Icon, CalendarIcon } from 'lucide-vue-next';

interface Props {
  user: User;
}

const { user } = defineProps<Props>();

const { t: $t } = useI18n();

const title: string = user.username
  ? `${user.username} (${user.name})`
  : user.name;

seoMeta({
  title,
  description: `${title} ${$t('nav.header.user.profile')}`
});

const { authUser, isAuthenticated } = useAuth();

const tempRoles = ['User'];
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <CommonTopImage src="/images/profile.avif" alt="User profile image">
      <CommonAvatar
        size="lg"
        :height="96"
        :width="96"
        loading="lazy"
        :user="user"
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

    <div
      class="flex flex-col gap-y-3 lg:flex-row lg:items-start lg:justify-between lg:gap-y-0"
    >
      <div class="flex flex-col gap-y-3">
        <h1 class="flex flex-col overflow-hidden text-ellipsis">
          <CommonGradientText class="bg-gradient-to-b text-2xl font-bold">
            {{ user.name }}
          </CommonGradientText>

          <span class="sr-only"> - </span>

          <span v-if="user.username">{{ user.username }}</span>
        </h1>

        <ul class="flex gap-x-2">
          <li
            v-for="(role, indexRole) in tempRoles"
            :key="indexRole"
            class="flex items-center"
          >
            <Badge>{{ role }}</Badge>
          </li>
        </ul>
      </div>

      <div class="flex items-center gap-x-1 text-sm">
        <CalendarIcon :size="16" />
        <CommonDate :date="user.createdAt" />
      </div>
    </div>
  </div>
</template>

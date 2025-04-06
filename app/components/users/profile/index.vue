<script lang="ts" setup>
import { Settings2Icon, ImageUpIcon, CalendarIcon } from 'lucide-vue-next';

import { UserRole } from '#shared/constants/user.constant';

interface Props {
  user: User;
}

const { user } = defineProps<Props>();

const { t: $t } = useI18n();

const title: string = user.displayUsername
  ? `${user.displayUsername} (${user.name})`
  : user.name;

seoMeta({
  title,
  description: `${title} ${$t('nav.header.user.profile')}`,
  image: user.image
});

const { authUser, isAuthenticated } = useAuth();

const { openAuthSettings } = useAuthSettings();

const {
  profileImage,
  isLoadingUpdateProfileImage,
  clickProfileImageInput,
  updateProfileImage
} = useUpdateProfileImage(user);

const basicRoles = [UserRole.USER];
</script>

<template>
  <div class="flex flex-col gap-y-6">
    <CommonTopImage
      :key="profileImage"
      :src="profileImage"
      alt="User profile image"
    >
      <input
        ref="user-profile-image-input"
        type="file"
        accept="image/*"
        class="hidden"
        @change="updateProfileImage"
      />

      <CommonAvatar
        size="lg"
        :height="96"
        :width="96"
        loading="lazy"
        :user="user"
        class="absolute bottom-2 left-2"
      />

      <div
        v-if="isAuthenticated && authUser?.id === user.id"
        class="absolute bottom-2 right-2 flex flex-col gap-2 sm:flex-row"
      >
        <Button
          variant="secondary"
          class="gap-x-2"
          @click="clickProfileImageInput"
        >
          <IconLoader v-if="isLoadingUpdateProfileImage" />
          <ImageUpIcon v-else :size="16" />
          {{ $t('form.image.button') }}
        </Button>

        <Button class="gap-x-2" @click="openAuthSettings">
          <Settings2Icon :size="16" />
          {{ $t('nav.header.user.settings') }}
        </Button>
      </div>
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

          <span v-if="user.displayUsername">
            {{ `@${user.displayUsername}` }}
          </span>
        </h1>

        <ul class="flex gap-x-2">
          <li
            v-for="(role, indexRole) in basicRoles"
            :key="indexRole"
            class="flex items-center"
          >
            <Badge>{{ $t(`roles.${role}`) }}</Badge>
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

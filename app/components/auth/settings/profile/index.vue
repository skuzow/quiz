<script lang="ts" setup>
const { authUser } = useAuth();

const isUpdateProfileOpen: Ref<boolean> = ref(false);
</script>

<template>
  <section :class="{ 'border-b': !isUpdateProfileOpen }">
    <h3 class="py-4 font-bold">
      {{ $t('auth.settings.profile.title') }}
    </h3>

    <div
      v-if="!isUpdateProfileOpen"
      class="flex flex-col justify-between gap-y-2 pb-4 pl-2.5 sm:flex-row sm:items-center sm:gap-y-0"
    >
      <div class="flex flex-row items-center gap-x-3">
        <CommonAvatar
          size="sm"
          :height="40"
          :width="40"
          :pointer="false"
          :user="authUser"
        />
        <p>{{ authUser?.name }}</p>
      </div>

      <div class="text-end">
        <Button variant="ghost" @click="isUpdateProfileOpen = true">
          {{ $t('auth.settings.profile.button') }}
        </Button>
      </div>
    </div>

    <AuthSettingsProfileForm
      v-else
      @close-update-profile="isUpdateProfileOpen = false"
    />
  </section>
</template>

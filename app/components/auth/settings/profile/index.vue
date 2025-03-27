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
      class="flex flex-row items-center justify-between pb-4 pl-2.5"
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

      <Button variant="ghost" @click="isUpdateProfileOpen = true">
        {{ $t('auth.settings.profile.button') }}
      </Button>
    </div>

    <AuthSettingsProfileForm
      v-else
      @close-update-profile="isUpdateProfileOpen = false"
    />
  </section>
</template>

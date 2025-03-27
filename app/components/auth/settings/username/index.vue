<script lang="ts" setup>
const { authUser } = useAuth();

const isUpdateUsernameOpen: Ref<boolean> = ref(false);
</script>

<template>
  <section :class="{ 'border-b': !isUpdateUsernameOpen }">
    <h3 class="py-4 font-bold">
      {{ $t('auth.settings.username.title') }}
    </h3>

    <div
      v-if="!isUpdateUsernameOpen"
      class="flex flex-row items-center justify-between pb-4 pl-2.5"
    >
      <p>
        {{ authUser?.username || $t('auth.settings.username.notDefined') }}
      </p>

      <Button variant="ghost" @click="isUpdateUsernameOpen = true">
        {{
          authUser?.username
            ? $t('auth.settings.username.button')
            : $t('auth.settings.username.buttonSet')
        }}
      </Button>
    </div>

    <AuthSettingsUsernameForm
      v-else
      @close-update-username="isUpdateUsernameOpen = false"
    />
  </section>
</template>

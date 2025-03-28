<script lang="ts" setup>
const { listAuthSessions } = useAuth();

const {
  status,
  refresh,
  data: sessions
} = await useLazyAsyncData('sessions', () => listAuthSessions());
</script>

<template>
  <IconLoader v-if="status === 'pending' && !sessions" />

  <ul
    v-else-if="status === 'success' && sessions"
    class="flex flex-col gap-y-2 pt-1"
  >
    <li v-for="session in sessions.data" :key="session.id">
      <AuthSettingsSessionsCard
        :session="session"
        @refresh-sessions="refresh"
      />
    </li>
  </ul>
</template>

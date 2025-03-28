<script lang="ts" setup>
import type { Session } from 'better-auth';
import {
  LaptopMinimalIcon,
  CalendarX2Icon,
  UserRoundIcon,
  UserRoundXIcon
} from 'lucide-vue-next';

interface Props {
  session: Session;
}

const { session } = defineProps<Props>();

const emit = defineEmits(['refresh-sessions']);

const { authSession, revokeSession } = useAuth();

const userAgent: string | undefined = session.userAgent
  ?.split('(')[1]
  ?.split(')')[0]
  ?.replaceAll(';', ' -');

const clickRevokeSession = async () => {
  const { error } = await revokeSession(session.token);

  if (!error) emit('refresh-sessions');
};
</script>

<template>
  <div
    class="flex flex-col justify-between gap-y-3 overflow-hidden rounded-xl border bg-card p-3 text-card-foreground sm:flex-row sm:gap-y-0"
  >
    <div>
      <div class="flex items-center gap-x-2">
        <LaptopMinimalIcon :size="16" />
        {{ userAgent }}
      </div>

      <div class="flex flex-row gap-x-3">
        <div class="flex items-center gap-x-2">
          <CalendarX2Icon :size="16" />
          <CommonDate :date="session.expiresAt" />
        </div>

        <div
          v-if="authSession?.token === session.token"
          class="flex items-center gap-x-2"
        >
          <UserRoundIcon :size="16" />
          {{ $t('auth.settings.sessions.current') }}
        </div>
      </div>
    </div>

    <Button class="gap-x-2" variant="secondary" @click="clickRevokeSession">
      <UserRoundXIcon :size="16" />
      {{ $t('auth.settings.sessions.button') }}
    </Button>
  </div>
</template>

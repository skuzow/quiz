<script lang="ts" setup>
import { MailIcon, CalendarIcon, UnlinkIcon } from 'lucide-vue-next';

import { authProviderIconMap } from '@/constants/auth.constant';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  account: any;
  length: number;
}

const { account } = defineProps<Props>();

const emit = defineEmits(['refresh-accounts']);

const clickUnlinkAccount = async () => {
  emit('refresh-accounts');
};
</script>

<template>
  <div
    class="flex items-center justify-between overflow-hidden rounded-xl border bg-card p-3 text-card-foreground"
  >
    <div>
      <p class="flex items-center gap-x-2">
        <component
          :is="authProviderIconMap[account.provider]"
          v-if="authProviderIconMap[account.provider]"
        />
        <MailIcon v-else :size="16" />
        {{
          account.provider === 'credential'
            ? $t('auth.settings.account.linked.credential')
            : titleCase(account.provider)
        }}
      </p>

      <p class="flex items-center gap-x-2">
        <CalendarIcon :size="16" />
        <CommonDate :date="account.createdAt" />
      </p>
    </div>

    <Button
      class="gap-x-2 text-destructive hover:text-destructive"
      variant="ghost"
      @click="clickUnlinkAccount"
    >
      <UnlinkIcon :size="16" />
      {{ $t('auth.settings.account.linked.button') }}
    </Button>
  </div>
</template>

<script lang="ts" setup>
import { MailIcon, CalendarIcon, UnlinkIcon } from 'lucide-vue-next';

import { useToast } from '@/components/ui/toast/use-toast';

import { authProviderIconMap } from '@/constants/auth.constant';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  account: any;
  length: number;
}

const { account, length } = defineProps<Props>();

const emit = defineEmits(['refresh-accounts']);

const { t: $t } = useI18n();

const { unlinkAccount } = useAuth();

const { toast } = useToast();

const accountProvider: string =
  account.provider === 'credential'
    ? $t('auth.settings.account.linked.credential')
    : titleCase(account.provider);

const clickUnlinkAccount = async () => {
  const { error } = await unlinkAccount({
    providerId: account.provider
  });

  if (error) {
    toast({
      title: $t('toast.auth.settings.account.linked.unlink.error'),
      description: error.message,
      variant: 'destructive'
    });
  } else {
    toast({
      title: $t('toast.auth.settings.account.linked.unlink.title'),
      description: accountProvider
    });

    emit('refresh-accounts');
  }
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
        {{ accountProvider }}
      </p>

      <p class="flex items-center gap-x-2">
        <CalendarIcon :size="16" />
        <CommonDate :date="account.createdAt" />
      </p>
    </div>

    <Button
      class="gap-x-2 text-destructive hover:text-destructive"
      variant="ghost"
      :disabled="length === 1"
      @click="clickUnlinkAccount"
    >
      <UnlinkIcon :size="16" />
      {{ $t('auth.settings.account.linked.button') }}
    </Button>
  </div>
</template>

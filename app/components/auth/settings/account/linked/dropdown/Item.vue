<script lang="ts" setup>
import { useToast } from '@/components/ui/toast/use-toast';

import {
  authProviderIconMap,
  type AuthProvider
} from '@/constants/auth.constant';

interface Props {
  provider: AuthProvider;
}

const { provider } = defineProps<Props>();

const { t: $t } = useI18n();

const { authUserURL, linkAccount } = useAuth();

const { toast } = useToast();

const isLoadingLinkAccount: Ref<boolean> = ref(false);

const clickLinkAccount = async (provider: AuthProvider) => {
  if (isLoadingLinkAccount.value) return;

  isLoadingLinkAccount.value = true;

  const { error } = await linkAccount({
    provider,
    callbackURL: authUserURL.value
  });

  isLoadingLinkAccount.value = false;

  if (error) {
    toast({
      title: $t('toast.auth.settings.account.linked.link.error'),
      description: error.message,
      variant: 'destructive'
    });
  }
};
</script>

<template>
  <DropdownMenuItem class="gap-2" @click="clickLinkAccount(provider)">
    <IconLoader v-if="isLoadingLinkAccount" />
    <component :is="authProviderIconMap[provider]" v-else />
    <span>{{ titleCase(provider) }}</span>
  </DropdownMenuItem>
</template>

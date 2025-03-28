<script lang="ts" setup>
import { LinkIcon } from 'lucide-vue-next';

import { useToast } from '@/components/ui/toast/use-toast';

import {
  AuthProviderValues,
  authProviderIconMap,
  type AuthProvider
} from '@/constants/auth.constant';

interface Props {
  accountProviders?: string[];
}

const { accountProviders } = defineProps<Props>();

const { t: $t } = useI18n();

const { authUserURL, linkAccount } = useAuth();

const { toast } = useToast();

const isLoadingLinkAccount: Ref<boolean> = ref(false);

const unlinkedProviders = computed(() =>
  AuthProviderValues.filter((provider) => !accountProviders?.includes(provider))
);

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
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button align="end" variant="ghost" class="gap-x-2">
        <LinkIcon :size="16" />
        {{ $t('auth.settings.account.linked.link') }}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-44 font-medium">
      <DropdownMenuItem
        v-for="authProvider in unlinkedProviders"
        :key="authProvider"
        class="gap-2"
        @click="clickLinkAccount(authProvider)"
      >
        <IconLoader v-if="isLoadingLinkAccount" />
        <component :is="authProviderIconMap[authProvider]" v-else />
        <span>{{ titleCase(authProvider) }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

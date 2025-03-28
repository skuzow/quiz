<script lang="ts" setup>
import { LinkIcon } from 'lucide-vue-next';

import {
  AuthProviderValues,
  authProviderIconMap
} from '@/constants/auth.constant';

interface Props {
  accountProviders?: string[];
}

const { accountProviders } = defineProps<Props>();

const unlinkedProviders = computed(() =>
  AuthProviderValues.filter((provider) => !accountProviders?.includes(provider))
);
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
      >
        <component :is="authProviderIconMap[authProvider]" />
        <span>{{ titleCase(authProvider) }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

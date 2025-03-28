<script lang="ts" setup>
import { AuthProviderValues } from '@/constants/auth.constant';

const { listAccounts } = useAuth();

const {
  status,
  refresh,
  data: accounts
} = await useLazyAsyncData('linked-accounts', () => listAccounts());

const accountProviders = computed(() =>
  accounts.value?.data
    ?.filter((account) => account.provider !== 'credential')
    .map((account) => account.provider)
);
</script>

<template>
  <IconLoader v-if="status === 'pending' && !accounts" />

  <ul
    v-else-if="status === 'success' && accounts?.data"
    class="flex flex-col gap-y-2 pt-1"
  >
    <li v-for="account in accounts.data" :key="account.id">
      <AuthSettingsAccountLinkedCard
        :account="account"
        :length="accounts.data.length"
        @refresh-accounts="refresh"
      />
    </li>

    <li
      v-if="accountProviders?.length !== AuthProviderValues.length"
      class="text-end"
    >
      <AuthSettingsAccountLinkedDropdown
        :account-providers="accountProviders"
      />
    </li>
  </ul>
</template>

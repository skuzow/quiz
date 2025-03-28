<script lang="ts" setup>
const { listAccounts } = useAuth();

const {
  status,
  refresh,
  data: accounts
} = await useLazyAsyncData('accounts', () => listAccounts());
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
  </ul>
</template>

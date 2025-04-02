<script lang="ts" setup>
import { UserRoundIcon, Settings2Icon, LogOutIcon } from 'lucide-vue-next';

const { authUser, authUserURL, signOut } = useAuth();

const { openAuthSettings } = useAuthSettings();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <CommonAvatar :user="authUser" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56 font-medium">
      <DropdownMenuLabel>
        <h3>{{ authUser?.name }}</h3>

        <p v-if="authUser?.displayUsername" class="text-xs font-medium">
          {{ `@${authUser.displayUsername}` }}
        </p>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <NuxtLink :to="authUserURL" :title="$t('nav.header.user.profile')">
          <DropdownMenuItem class="gap-2">
            <UserRoundIcon :size="16" />
            <span>{{ $t('nav.header.user.profile') }}</span>
          </DropdownMenuItem>
        </NuxtLink>

        <DropdownMenuItem class="gap-2" @click="openAuthSettings">
          <Settings2Icon :size="16" />
          <span>{{ $t('nav.header.user.settings') }}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="gap-2" @click="signOut">
        <LogOutIcon :size="16" />
        <span>{{ $t('nav.header.user.logout') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

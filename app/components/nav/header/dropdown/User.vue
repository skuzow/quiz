<script lang="ts" setup>
import { UserRoundIcon, Settings2Icon, LogOutIcon } from 'lucide-vue-next';

const { authUser, authUserInfo, authUserURL, signOut } = useAuth();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <CommonAvatar :user="authUser" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="w-56 font-medium">
      <DropdownMenuLabel>
        <h3>{{ authUser?.name }}</h3>

        <p class="text-xs font-medium">
          {{ authUserInfo }}
        </p>
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <NuxtLink :to="authUserURL" :title="$t('nav.header.user.profile')">
          <DropdownMenuItem class="cursor-pointer gap-2">
            <UserRoundIcon :size="16" />
            <span>{{ $t('nav.header.user.profile') }}</span>
          </DropdownMenuItem>
        </NuxtLink>

        <DropdownMenuItem class="cursor-pointer gap-2">
          <Settings2Icon :size="16" />
          <span>{{ $t('nav.header.user.settings') }}</span>
        </DropdownMenuItem>
      </DropdownMenuGroup>

      <DropdownMenuSeparator />

      <DropdownMenuItem class="cursor-pointer gap-2" @click="signOut">
        <LogOutIcon :size="16" />
        <span>{{ $t('nav.header.user.logout') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

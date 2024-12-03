<script lang="ts" setup>
import { UserRoundIcon, Settings2Icon, LogOutIcon } from 'lucide-vue-next';

const { user, nameAbbreviation, userURL, signOut } = useAuth();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Avatar size="xs" shape="square" class="cursor-pointer">
        <AvatarImage
          v-if="user?.image"
          :src="user?.image"
          width="36"
          height="36"
          title="Avatar"
          alt="Avatar"
        />
        <AvatarFallback>
          {{ nameAbbreviation }}
        </AvatarFallback>
      </Avatar>
    </DropdownMenuTrigger>
    <DropdownMenuContent class="w-56">
      <DropdownMenuLabel>
        {{ $t('nav.header.user.myAccount') }}
      </DropdownMenuLabel>

      <DropdownMenuSeparator />

      <DropdownMenuGroup>
        <NuxtLink :to="userURL" :title="$t('nav.header.user.profile')">
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

<script lang="ts" setup>
import { SunIcon, MoonIcon, LaptopMinimalIcon } from 'lucide-vue-next';

import { Theme } from '@/constants/theme';

const colorMode = useColorMode();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <SunIcon :size="18" class="scale-100 dark:scale-0" />
        <MoonIcon :size="18" class="absolute scale-0 dark:scale-100" />
        <span class="sr-only">{{ $t('nav.header.theme.button') }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="font-medium">
      <DropdownMenuItem
        class="cursor-pointer gap-2"
        @click="colorMode.preference = Theme.LIGHT"
      >
        <SunIcon :size="16" />
        <span>{{ $t('nav.header.theme.light') }}</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        class="cursor-pointer gap-2"
        @click="colorMode.preference = Theme.DARK"
      >
        <MoonIcon :size="16" />
        <span>{{ $t('nav.header.theme.dark') }}</span>
      </DropdownMenuItem>

      <DropdownMenuItem
        class="cursor-pointer gap-2"
        @click="colorMode.preference = Theme.SYSTEM"
      >
        <LaptopMinimalIcon :size="16" />
        <span>{{ $t('nav.header.theme.system') }}</span>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

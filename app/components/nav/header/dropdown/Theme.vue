<script lang="ts" setup>
import { SunIcon, MoonIcon, LaptopMinimalIcon } from 'lucide-vue-next';
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
      <DropdownMenuItem class="cursor-pointer gap-2">
        <SunIcon :size="16" />
        {{ $t('nav.header.theme.light') }}
      </DropdownMenuItem>

      <DropdownMenuItem class="cursor-pointer gap-2">
        <MoonIcon :size="16" />
        {{ $t('nav.header.theme.dark') }}
      </DropdownMenuItem>

      <DropdownMenuItem class="cursor-pointer gap-2">
        <LaptopMinimalIcon :size="16" />
        {{ $t('nav.header.theme.system') }}
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

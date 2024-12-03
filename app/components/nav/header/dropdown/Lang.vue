<script lang="ts" setup>
const { locale, locales } = useI18n();

const switchLocalePath = useSwitchLocalePath();
</script>

<template>
  <DropdownMenu>
    <DropdownMenuTrigger as-child>
      <Button variant="ghost" size="icon">
        <span class="mt-0.5 text-base">{{ locale.toUpperCase() }}</span>
        <span class="sr-only">{{ $t('nav.header.lang.button') }}</span>
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" class="font-medium">
      <NuxtLink
        v-for="{ code, name } in locales"
        :key="code"
        :to="switchLocalePath(code)"
        :title="code.toUpperCase()"
      >
        <DropdownMenuItem class="cursor-pointer">
          <span>{{ name }}</span>
        </DropdownMenuItem>
      </NuxtLink>
    </DropdownMenuContent>
  </DropdownMenu>
</template>

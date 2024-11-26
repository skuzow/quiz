<script lang="ts" setup>
const sessionStore = await useSessionStore();

const localePath = useLocalePath();
</script>

<template>
  <header class="sticky top-0 z-10 bg-background/80 py-2.5 backdrop-blur-md">
    <nav class="container flex max-w-[92rem] flex-1 justify-between md:px-8">
      <div class="flex gap-x-5">
        <NuxtLink
          :to="localePath('/')"
          :title="$t('nav.home')"
          class="flex items-center gap-x-2"
        >
          <NavLogo />
          <span class="font-bold">skuzow/quiz</span>
        </NuxtLink>

        <NavHeaderMenuDesktop class="hidden md:flex" />
      </div>

      <ul class="flex gap-x-1 md:gap-x-4">
        <li>
          <NavHeaderDropdownLang />
        </li>

        <li>
          <NavHeaderDropdownTheme />
        </li>

        <li v-if="!sessionStore.isAuthenticated" class="hidden md:flex">
          <NuxtLink :to="localePath('/login')" :title="$t('nav.header.login')">
            <Button variant="secondary">
              {{ $t('nav.header.login') }}
            </Button>
          </NuxtLink>
        </li>

        <li v-if="!sessionStore.isAuthenticated" class="hidden md:flex">
          <NuxtLink
            :to="localePath('/signup')"
            :title="$t('nav.header.signup')"
          >
            <Button>
              {{ $t('nav.header.signup') }}
            </Button>
          </NuxtLink>
        </li>

        <li class="md:hidden">
          <NavHeaderMenuMobile />
        </li>
      </ul>
    </nav>
  </header>
</template>

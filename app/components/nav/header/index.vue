<script lang="ts" setup>
const { isAuthenticated } = useAuth();

const localePath = useLocalePath();

const { user } = useAuth();
</script>

<template>
  <header class="sticky top-0 z-10 bg-background/80 py-2.5 backdrop-blur-md">
    <nav class="container flex max-w-[92rem] flex-1 justify-between md:px-8">
      <div class="flex gap-x-5">
        <NuxtLink
          :to="localePath(user ? '/tests' : '/')"
          :title="user ? $t('tests.title') : $t('nav.home')"
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

        <li v-if="isAuthenticated" class="hidden md:flex">
          <NavHeaderDropdownUser />
        </li>

        <template v-else>
          <li class="hidden md:flex">
            <NuxtLink
              :to="localePath('/login')"
              :title="$t('nav.header.login')"
            >
              <Button variant="secondary">
                {{ $t('nav.header.login') }}
              </Button>
            </NuxtLink>
          </li>

          <li class="hidden md:flex">
            <NuxtLink
              :to="localePath('/signup')"
              :title="$t('nav.header.signup')"
            >
              <Button>
                {{ $t('nav.header.signup') }}
              </Button>
            </NuxtLink>
          </li>
        </template>

        <li class="md:hidden">
          <NavHeaderMenuMobile />
        </li>
      </ul>
    </nav>
  </header>
</template>

<script lang="ts" setup>
const { isAuthenticated } = useAuth();
</script>

<template>
  <header class="sticky top-0 z-10 bg-background/80 py-2.5 backdrop-blur-md">
    <nav class="container flex max-w-[92rem] flex-1 justify-between md:px-8">
      <div class="flex gap-x-5">
        <NuxtLinkLocale
          :to="isAuthenticated ? '/tests' : '/'"
          :title="isAuthenticated ? $t('tests.title') : $t('nav.home')"
          class="flex items-center gap-x-0.5"
        >
          <NavLogo />
          <span class="text-xl font-bold">uiz</span>
        </NuxtLinkLocale>

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
            <NuxtLinkLocale to="/login" :title="$t('nav.header.login')">
              <Button variant="secondary">
                {{ $t('nav.header.login') }}
              </Button>
            </NuxtLinkLocale>
          </li>

          <li class="hidden md:flex">
            <NuxtLinkLocale to="/signup" :title="$t('nav.header.signup')">
              <Button>
                {{ $t('nav.header.signup') }}
              </Button>
            </NuxtLinkLocale>
          </li>
        </template>

        <li class="md:hidden">
          <NavHeaderMenuMobile />
        </li>
      </ul>
    </nav>
  </header>
</template>

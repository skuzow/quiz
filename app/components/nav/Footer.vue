<script lang="ts" setup>
import { AtSignIcon } from 'lucide-vue-next';

const currentYear: number = new Date().getFullYear();
</script>

<template>
  <footer class="pb-6 pt-5">
    <nav
      class="container flex max-w-6xl flex-1 flex-col items-center justify-between md:flex-row md:px-8"
    >
      <div class="flex flex-col gap-y-3 md:flex-row md:gap-x-5 md:gap-y-0">
        <div class="flex items-center justify-center gap-x-2">
          <NavLogo />
          <span class="font-bold">/ {{ currentYear }}</span>
        </div>

        <ul class="flex gap-x-1">
          <li>
            <NuxtLinkLocale to="/" :title="$t('nav.home')">
              <Button variant="link">
                {{ $t('nav.home') }}
              </Button>
            </NuxtLinkLocale>
          </li>

          <li>
            <NuxtLinkLocale to="/tests" :title="$t('nav.explore')">
              <Button variant="link">
                {{ $t('nav.explore') }}
              </Button>
            </NuxtLinkLocale>
          </li>

          <li>
            <NuxtLinkLocale to="/create" :title="$t('nav.create')">
              <Button variant="link">
                {{ $t('nav.create') }}
              </Button>
            </NuxtLinkLocale>
          </li>

          <li>
            <NuxtLinkLocale to="/about" :title="$t('nav.about')">
              <Button variant="link">
                {{ $t('nav.about') }}
              </Button>
            </NuxtLinkLocale>
          </li>
        </ul>
      </div>

      <NuxtLink
        to="mailto:contact@quiz.skuzow.com"
        :title="$t('nav.footer.contact')"
      >
        <Button variant="link" class="hidden md:flex md:gap-x-1">
          <AtSignIcon :size="16" />
          {{ $t('nav.footer.contact') }}
        </Button>
      </NuxtLink>
    </nav>
  </footer>
</template>

<script lang="ts" setup>
import { AtSignIcon } from 'lucide-vue-next';

const localePath = useLocalePath();

const currentYear: number = new Date().getFullYear();
</script>

<template>
  <footer class="py-2.5">
    <nav
      class="container flex max-w-6xl flex-1 flex-col items-center justify-between md:flex-row md:px-8"
    >
      <div class="flex flex-col gap-y-2 md:flex-row md:gap-x-5">
        <div class="flex items-center justify-center gap-x-2">
          <NavLogo />
          <span class="font-bold">/ © skuzow/quiz {{ currentYear }}</span>
        </div>

        <ul class="flex gap-x-1">
          <li>
            <NuxtLink :to="localePath('/')" :title="$t('nav.home')">
              <Button variant="link">
                {{ $t('nav.home') }}
              </Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink :to="localePath('/tests')" :title="$t('nav.explore')">
              <Button variant="link">
                {{ $t('nav.explore') }}
              </Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink :to="localePath('/create')" :title="$t('nav.create')">
              <Button variant="link">
                {{ $t('nav.create') }}
              </Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink :to="localePath('/about')" :title="$t('nav.about')">
              <Button variant="link">
                {{ $t('nav.about') }}
              </Button>
            </NuxtLink>
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

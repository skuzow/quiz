<script lang="ts" setup>
import { AtSignIcon } from 'lucide-vue-next';

const currentYear: number = new Date().getFullYear();
</script>

<template>
  <footer class="py-2.5">
    <nav
      class="container flex max-w-6xl flex-1 flex-col items-center justify-between gap-y-4 md:flex-row"
    >
      <div class="flex flex-col gap-y-2 md:flex-row md:gap-x-5">
        <div class="flex items-center justify-center gap-x-2">
          <NavLogo />
          <span class="font-bold">/ © skuzow/quiz {{ currentYear }}</span>
        </div>

        <ul class="flex gap-x-1">
          <li>
            <NuxtLink to="/" title="Home">
              <Button variant="link">Home</Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/tests" title="Explore">
              <Button variant="link">Explore</Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/create" title="Create">
              <Button variant="link">Create</Button>
            </NuxtLink>
          </li>

          <li>
            <NuxtLink to="/about" title="About">
              <Button variant="link">About</Button>
            </NuxtLink>
          </li>
        </ul>
      </div>

      <NuxtLink to="mailto:contact@quiz.skuzow.com" title="Contact email">
        <Button class="gap-x-1">
          <AtSignIcon :size="16" />
          Contact
        </Button>
      </NuxtLink>
    </nav>
  </footer>
</template>

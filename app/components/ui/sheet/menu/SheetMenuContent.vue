<script lang="ts" setup>
import type { NavMenuItem } from '@/constants/navMenu';

interface Props {
  navMenuTitle: string;
  navMenuItems: NavMenuItem[];
}

const { navMenuTitle, navMenuItems } = defineProps<Props>();
</script>

<template>
  <div class="flex flex-col gap-y-4">
    <h3 class="font-bold">{{ navMenuTitle }}</h3>

    <ul class="flex flex-col gap-y-4">
      <li v-for="{ link, title, description } in navMenuItems" :key="title">
        <SheetClose as-child>
          <NuxtLink
            :to="link"
            :title="title"
            class="flex flex-col gap-y-1 text-sm"
          >
            <h4 class="font-medium">{{ title }}</h4>

            <p class="leading-snug text-muted-foreground">
              {{ description }}
            </p>
          </NuxtLink>
        </SheetClose>
      </li>
    </ul>
  </div>
</template>

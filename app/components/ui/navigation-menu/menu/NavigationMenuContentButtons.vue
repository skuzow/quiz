<script lang="ts" setup>
interface Props {
  navMenuItems: NavMenuItem[];
}

const { navMenuItems } = defineProps<Props>();
</script>

<template>
  <li v-for="{ link, title, description } in navMenuItems" :key="title">
    <NavigationMenuLink as-child>
      <NuxtLinkLocale
        :to="link"
        :title="title"
        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
      >
        <div class="text-sm font-medium leading-none">{{ title }}</div>

        <p class="line-clamp-2 text-sm leading-snug text-muted-foreground">
          {{ description }}
        </p>
      </NuxtLinkLocale>
    </NavigationMenuLink>
  </li>
</template>

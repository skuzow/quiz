<script lang="ts" setup>
interface Props {
  navMenuAside: NavMenuItem;
}

const { navMenuAside } = defineProps<Props>();

const { link, title, description } = navMenuAside;
</script>

<template>
  <li class="row-span-3">
    <NavigationMenuLink as-child>
      <NuxtLinkLocale :to="link" :title="title">
        <div
          class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none hover:to-muted/90 focus:shadow-md"
        >
          <slot />

          <div class="mb-2 mt-4 text-lg font-medium">
            {{ title }}
          </div>

          <p class="text-sm leading-tight text-muted-foreground">
            {{ description }}
          </p>
        </div>
      </NuxtLinkLocale>
    </NavigationMenuLink>
  </li>
</template>

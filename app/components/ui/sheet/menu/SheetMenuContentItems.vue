<script lang="ts" setup>
interface Props {
  navMenuItems: NavMenuItem[];
}

const { navMenuItems } = defineProps<Props>();

const localePath = useLocalePath();
</script>

<template>
  <ul class="flex flex-col gap-y-4">
    <li v-for="{ link, title, description } in navMenuItems" :key="title">
      <SheetClose as-child>
        <NuxtLink
          :to="localePath(link)"
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
</template>

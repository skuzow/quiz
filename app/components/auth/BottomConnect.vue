<script lang="ts" setup>
interface Props {
  text: string;
  connection: string;
}

const { text, connection } = defineProps<Props>();

const localePath = useLocalePath();
</script>

<template>
  <p class="flex items-center justify-center gap-x-2 text-sm">
    <span class="text-muted-foreground">
      {{ text }}
    </span>

    <NuxtLink
      :to="localePath(`/${connection}`)"
      :title="$t(`nav.header.${connection}`)"
      class="cursor-pointer hover:underline"
    >
      {{ $t(`nav.header.${connection}`) }}
    </NuxtLink>
  </p>
</template>

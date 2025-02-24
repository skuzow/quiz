<script lang="ts" setup>
interface Props {
  text: string;
  connection: string;
}

const { text, connection } = defineProps<Props>();
</script>

<template>
  <p class="flex items-center justify-center gap-x-2 text-sm">
    <span class="text-muted-foreground">
      {{ text }}
    </span>

    <NuxtLinkLocale
      :to="`/${connection}`"
      :title="$t(`nav.header.${connection}`)"
      class="cursor-pointer hover:underline"
    >
      {{ $t(`nav.header.${connection}`) }}
    </NuxtLinkLocale>
  </p>
</template>

<script lang="ts" setup>
interface Props {
  date: Date;
}

const { date } = defineProps<Props>();

const { d } = useI18n();
</script>

<template>
  <time :datetime="date.toString()">{{ d(date) }}</time>
</template>

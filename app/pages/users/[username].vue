<script lang="ts" setup>
const route = useRoute();
</script>

<template>
  <h1>{{ route.params.username }}</h1>
</template>

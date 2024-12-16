<script lang="ts" setup>
definePageMeta({ middleware: ['auth'] });

seoMeta();

const createStore = useCreateStore();
</script>

<template>
  <div>
    <h1 class="text-8xl">create</h1>

    <span v-if="createStore.createTestValue">
      {{ createStore.createTestValue }}
    </span>
  </div>
</template>
